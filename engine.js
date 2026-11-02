(function(root){
  'use strict';
  const KEY='biologi2-intensiv-v1';
  function fresh(){return {schema:1,budget:360,studiedSeconds:0,focusLength:25,cards:{},drafts:{},exams:{},practice:{},attempts:{},tasks:{},diagnosed:false,lastRoute:'home'};}
  const remain=s=>Math.max(0,Math.ceil(s.budget-s.studiedSeconds/60));
  const assessments=c=>[...c.exams,...(c.variations||[]),...(c.exit||[])];
  function gaps(s,c,chapter=''){
    const result=[];
    for(const item of c.cards){const a=s.attempts?.[item.id];if(a?.graded)for(const [i,text] of (c.rubrics?.[item.id]||[]).entries())if(!a.checks[i]&&(!chapter||item.chapter===chapter))result.push({id:item.id,kind:'card',chapter:item.chapter,text});}
    for(const item of assessments(c)){const a=s.exams[item.id]||s.practice?.[item.id];if(a)for(const [i,p] of item.points.entries())if(!a.checks[i]&&(!chapter||p[0]===chapter))result.push({id:item.id,kind:c.exams.includes(item)?'exam':'practice',chapter:p[0],text:p[1]});}
    return result;
  }
  function chapterStats(s,c,id){const cards=c.cards.filter(x=>x.chapter===id);const rated=cards.filter(x=>s.cards[x.id]);const secure=cards.filter(x=>s.cards[x.id]?.rating===2).length;const score=cards.reduce((n,x)=>n+(s.cards[x.id]?.rating??0),0)/(cards.length*2);return {total:cards.length,rated:rated.length,secure,score,missed:gaps(s,c,id).length,unknown:cards.length-rated.length};}
  function dueCards(s,c,filter='weak',chapter='',now=Date.now()){
    const all=c.cards.filter(x=>!chapter||x.chapter===chapter);
    const candidates=all.filter(x=>{const a=s.cards[x.id];if(filter==='all')return true;if(filter==='unseen')return !a;if(filter==='due')return a&&a.due<=now;return !a||a.rating<2||a.due<=now||chapterStats(s,c,x.chapter).missed>0;});
    return candidates.sort((a,b)=>{const ra=s.cards[a.id],rb=s.cards[b.id];const urgency=x=>{const r=s.cards[x.id];return (r?r.rating:0)*10+(r?0:2)-Math.min(5,chapterStats(s,c,x.chapter).missed)+(r?.due<=now?-3:0)};return urgency(a)-urgency(b)||((ra?.at??0)-(rb?.at??0))||c.cards.indexOf(a)-c.cards.indexOf(b)});
  }
  function startAttempt(s,c,id,text,spoken=false,assisted=false,now=Date.now()){
    const item=assessments(c).find(x=>x.id===id);const count=c.rubrics?.[id]?.length||item?.points.length;
    if(!count)throw Error('Okänd fråga.');
    s.attempts[id]={text:String(text||''),spoken:!!spoken,assisted:!!assisted,at:now,checks:Array(count).fill(false),graded:false};
    return s.attempts[id];
  }
  function rate(s,id,rating,now=Date.now(),evidence){
    const previous=s.cards[id];let firstPassAt=previous?.firstPassAt||0,retainedAt=previous?.retainedAt||0;
    if(evidence){
      const complete=evidence.checks?.length===3&&evidence.checks.every(Boolean)&&!evidence.assisted;
      if(rating===2&&!complete)rating=1;
      if(rating===2){if(!firstPassAt)firstPassAt=now;if(now-firstPassAt>=10*60000&&evidence.at> (previous?.lastAttemptAt||0))retainedAt=now;}else {firstPassAt=0;retainedAt=0;}
    }
    const interval=rating===2&&evidence&&!retainedAt?10*60000:[10*60000,4*3600000,18*3600000][rating];
    s.cards[id]={rating,at:now,due:now+interval,attempts:(previous?.attempts??0)+1,...(evidence?{firstPassAt,retainedAt,lastAttemptAt:evidence.at||now}:{} )};
    if(s.attempts?.[id])s.attempts[id].graded=true;
    return s.cards[id];
  }
  function finishAssessment(s,c,id,checks,now=Date.now()){
    const q=assessments(c).find(x=>x.id===id),a=s.attempts[id];
    if(!q||!a||checks.length!==q.points.length)throw Error('Gör ett eget försök först.');
    const record={checks:checks.map(x=>a.assisted?false:!!x),at:now,assisted:a.assisted};
    a.checks=record.checks;a.graded=true;
    if(c.exams.some(x=>x.id===id))s.exams[id]=record;else s.practice[id]=record;
    return record;
  }
  function adaptive(s,c){
    const time=remain(s);const mode=time<=200?'minimum':time>=420?'extra':'standard';
    const mins={celler:15,membran:20,osmos:25,aktiv:20,mikrober:20,antibiotika:25,vaxtcell:15};
    const ranked=c.chapters.map((x,i)=>({chapter:x,stats:chapterStats(s,c,x.id),weight:(1-chapterStats(s,c,x.id).score)*4+Math.min(3,chapterStats(s,c,x.id).missed)*1.5+[.9,1.1,1,.8,.5,.9,.3][i]})).sort((a,b)=>b.weight-a.weight);
    let left=time;const tasks=[];
    // Reserve time for recall and original writing even in a short plan.
    if(left>=30){const n=Math.min(mode==='minimum'?15:20,Math.floor(left*.12));tasks.push({title:'Återkalla dina svagaste kärnfrågor',minutes:n,route:'review',priority:'must'});left-=n;}
    if(left>=35){const n=Math.min(mode==='minimum'?25:35,Math.floor(left*.2));tasks.push({title:'Skriv ett öppet svar och bedöm det själv',minutes:n,route:'exams',priority:'must'});left-=n;}
    for(const x of ranked){const need=x.stats.secure===x.stats.total&&x.stats.missed===0?5:mode==='minimum'?mins[x.chapter.id]:x.chapter.minutes;if(left>=5){const n=Math.min(need,left);tasks.push({title:(need===5?'Snabbkontroll: ':n<need?'Reparera viktigaste mekanismen: ':'Kärna + kontroll: ')+x.chapter.title,minutes:n,route:'chapter/'+x.chapter.id,priority:'must'});left-=n;}}
    if(left>0){tasks.push({title:mode==='extra'?'Viktig fördjupning + utmanande provfrågor':'Fördjupa missade samband och repetera efter en paus',minutes:left,route:mode==='extra'?'exams':'connections',priority:'deep'});}
    // Learn/repare core mechanisms before the writing/recall time reserved above.
    tasks.sort((a,b)=>{const order=t=>t.route.startsWith('chapter/')?0:t.route==='review'?1:t.route==='exams'?2:3;return order(a)-order(b);});
    return {mode,tasks,ranked,time};
  }
  function validateImport(obj,c){
    if(!obj||obj.schema!==1||typeof obj!=='object')throw Error('Filen är inte en säkerhetskopia från den här kursen.');
    const s=fresh();if(!Number.isFinite(obj.budget)||obj.budget<5||obj.budget>100000||!Number.isFinite(obj.studiedSeconds)||obj.studiedSeconds<0||obj.studiedSeconds>6000000)throw Error('Tidsuppgifterna i filen är ogiltiga.');
    s.budget=obj.budget;s.studiedSeconds=obj.studiedSeconds;s.focusLength=[15,25,40].includes(obj.focusLength)?obj.focusLength:25;s.diagnosed=obj.diagnosed===true;
    for(const x of c.cards){const r=obj.cards?.[x.id];if(r){if(![0,1,2].includes(r.rating)||!Number.isFinite(r.at)||!Number.isFinite(r.due))throw Error('Ogiltig självskattning i filen.');s.cards[x.id]={rating:r.rating,at:r.at,due:r.due,attempts:Number.isInteger(r.attempts)&&r.attempts>0?r.attempts:1,...(Number.isFinite(r.firstPassAt)?{firstPassAt:r.firstPassAt}:{}),...(Number.isFinite(r.retainedAt)?{retainedAt:r.retainedAt}:{}),...(Number.isFinite(r.lastAttemptAt)?{lastAttemptAt:r.lastAttemptAt}:{})};}if(typeof obj.drafts?.[x.id]==='string')s.drafts[x.id]=obj.drafts[x.id].slice(0,12000);}
    for(const e of c.exams){if(typeof obj.drafts?.[e.id]==='string')s.drafts[e.id]=obj.drafts[e.id].slice(0,40000);const a=obj.exams?.[e.id];if(a){if(!Array.isArray(a.checks)||a.checks.length!==e.points.length||a.checks.some(v=>typeof v!=='boolean'))throw Error('Ogiltig bedömningsmall i filen.');s.exams[e.id]={checks:a.checks,at:Number.isFinite(a.at)?a.at:Date.now()};}}
    for(const e of [...(c.variations||[]),...(c.exit||[])]){if(typeof obj.drafts?.[e.id]==='string')s.drafts[e.id]=obj.drafts[e.id].slice(0,40000);const a=obj.practice?.[e.id];if(a){if(!Array.isArray(a.checks)||a.checks.length!==e.points.length||a.checks.some(v=>typeof v!=='boolean'))throw Error('Ogiltig bedömningsmall i filen.');s.practice[e.id]={checks:a.checks,at:Number.isFinite(a.at)?a.at:Date.now(),assisted:!!a.assisted};}}
    for(const q of [...c.cards,...assessments(c)]){const a=obj.attempts?.[q.id];if(a){const count=c.rubrics?.[q.id]?.length||q.points?.length;if(!Array.isArray(a.checks)||a.checks.length!==count||a.checks.some(v=>typeof v!=='boolean'))throw Error('Ogiltigt sparat försök.');s.attempts[q.id]={text:typeof a.text==='string'?a.text.slice(0,40000):'',spoken:!!a.spoken,assisted:!!a.assisted,at:Number.isFinite(a.at)?a.at:Date.now(),checks:a.checks,graded:!!a.graded};}}
    for(const session of c.sessions)for(const t of session.tasks)if(obj.tasks?.[t[0]]===true)s.tasks[t[0]]=true;
    return s;
  }
  root.BioEngine={KEY,fresh,remain,chapterStats,dueCards,rate,adaptive,validateImport,assessments,gaps,startAttempt,finishAssessment};
})(typeof window==='undefined'?globalThis:window);
