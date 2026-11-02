const assert=require('node:assert/strict');
global.window=global;
require('./data.js');require('./practice-data.js');require('./engine.js');
const C=global.COURSE,E=global.BioEngine;
let checks=0;
function test(name,f){f();checks++;console.log('PASS '+name);}
test('Scope, unique IDs and working references',()=>{
 assert.equal(C.chapters.length,7);assert.deepEqual(C.chapters.map(c=>c.id),['celler','membran','osmos','aktiv','mikrober','antibiotika','vaxtcell']);assert.equal(C.cards.length,28);assert.equal(C.exams.length,13);assert.equal(C.connections.length,7);
 for(const items of [C.cards,C.exams,C.connections])assert.equal(new Set(items.map(x=>x.id)).size,items.length);
 for(const c of C.chapters){assert.equal(c.steps.length,6);assert.equal(C.cards.filter(x=>x.chapter===c.id).length,4);assert(c.deeper.length&&c.extra.length&&c.traps.length);}
 for(const e of C.exams){assert(e.model&&e.develop&&e.mistake&&e.terms.length);assert(e.points.length>=4);for(const [id,text] of e.points){assert(C.chapters.some(c=>c.id===id));assert(text.length>15);}}
 for(const c of C.connections)assert(C.exams.some(e=>e.id===c.exam));
});
test('Every scheduled minute is counted once, pauses excluded',()=>{
 assert.equal(C.sessions.reduce((n,s)=>n+s.effective,0),360);
 assert.equal(C.sessions.filter(s=>s.day===1).reduce((n,s)=>n+s.effective,0),235);
 assert.equal(C.sessions.filter(s=>s.day===2).reduce((n,s)=>n+s.effective,0),125);
 for(const s of C.sessions){assert.equal(s.tasks.reduce((n,t)=>n+t[2],0),s.effective);for(const t of s.tasks){const [kind,id]=t[3].split('/');if(kind==='chapter')assert(C.chapters.some(x=>x.id===id));if(kind==='exam')assert(C.exams.some(x=>x.id===id));if(kind==='connection')assert(C.connections.some(x=>x.id===id));if(kind==='variation')assert(C.variations.some(x=>x.id===id));}}
 assert.equal(C.chapters.reduce((n,c)=>n+c.minutes,0)+85,360);
});
test('Confidence and activity completion are separate',()=>{
 const s=E.fresh();s.tasks.cell=true;assert.equal(E.chapterStats(s,C,'celler').secure,0);E.rate(s,'c1',2,1000);assert.equal(E.chapterStats(s,C,'celler').secure,1);assert.equal(E.chapterStats(s,C,'celler').unknown,3);
});
test('Spaced recall and previous errors affect real queue',()=>{
 const s=E.fresh();for(const c of C.cards)E.rate(s,c.id,2,1000);
 assert.equal(E.dueCards(s,C,'weak','',2000).length,0);assert.equal(E.dueCards(s,C,'due','',1000+19*3600000).length,28);
 E.rate(s,'a1',0,2000);assert.equal(E.dueCards(s,C,'weak','',3000)[0].id,'a1');assert.equal(s.cards.a1.due,2000+600000);
 s.exams.e4={checks:[false,true,true,false],at:3000};assert.equal(E.chapterStats(s,C,'antibiotika').missed,1);assert.equal(E.chapterStats(s,C,'mikrober').missed,1);assert(E.dueCards(s,C,'weak','',4000).some(x=>x.chapter==='mikrober'));
});
test('Short, standard, extra, delayed and exhausted budgets stay bounded',()=>{
 for(const time of [0,5,25,80,180,345,360,450,600]){const s=E.fresh();s.budget=time;const a=E.adaptive(s,C);assert.equal(a.tasks.reduce((n,t)=>n+t.minutes,0),time);assert(a.tasks.every(t=>t.minutes>0));if(time===180)assert.equal(a.tasks.filter(t=>t.route.startsWith('chapter/')).length,7);}
 const s=E.fresh();s.studiedSeconds=60*15;assert.equal(E.remain(s),345);assert.equal(E.adaptive(s,C).mode,'standard');
});
test('Missed exam points increase chapter priority',()=>{
 const s=E.fresh();for(const c of C.cards)E.rate(s,c.id,2);s.exams.e7={checks:[false,true,true,false],at:Date.now()};assert.equal(E.adaptive(s,C).ranked[0].chapter.id,'antibiotika');
});
test('Round-trip backup preserves answers, zero ratings and exam details',()=>{
 const s=E.fresh();E.rate(s,'c1',0);s.drafts.c1='<b>Mitt svar</b>';s.drafts.e1='Ett eget resonemang';s.exams.e1={checks:[true,false,true,false],at:1000};s.tasks.cell=true;s.diagnosed=true;const r=E.validateImport(JSON.parse(JSON.stringify(s)),C);assert.equal(r.cards.c1.rating,0);assert.equal(r.drafts.c1,s.drafts.c1);assert.equal(r.exams.e1.checks[1],false);assert(r.tasks.cell&&r.diagnosed);
});
test('Bad imports are rejected and unexpected keys are discarded',()=>{
 assert.throws(()=>E.validateImport({schema:2},C));const s=E.fresh();s.budget=-20;assert.throws(()=>E.validateImport(s,C));s.budget=360;s.exams.e1={checks:['yes'],at:1};assert.throws(()=>E.validateImport(s,C));delete s.exams.e1;s.drafts.injected='<script>';s.tasks.unknown=true;const r=E.validateImport(s,C);assert.equal(r.drafts.injected,undefined);assert.equal(r.tasks.unknown,undefined);
});
test('Original questions remain, with only one new full exam and four short variations',()=>{
 const before=require('./test-baseline.json');const digest=x=>require('node:crypto').createHash('sha256').update(JSON.stringify(x)).digest('hex');
 for(const card of before.cards)assert.equal(digest(C.cards.find(x=>x.id===card.id)),card.sha);
 for(const q of before.exams)assert.equal(digest(C.exams.find(x=>x.id===q.id)),q.sha);
 assert.equal(C.variations.length,4);assert.equal(C.exit.length,3);
 for(const c of C.cards)assert.equal(C.rubrics[c.id].length,3);
});
test('All new training fits the existing 360-minute schedule',()=>{
 assert.equal(C.timeBudget.reduce((n,x)=>n+x[1],0),360);
 const tasks=C.sessions.flatMap(s=>s.tasks);assert.equal(tasks.filter(t=>t[3].startsWith('variation/')).reduce((n,t)=>n+t[2],0),16);
 assert.equal(tasks.filter(t=>t[3].startsWith('exam/')).reduce((n,t)=>n+t[2],0),45);
 assert.equal(tasks.find(t=>t[3]==='exit-check')[2],5);
 assert.equal(new Set(tasks.map(t=>t[0])).size,tasks.length);
});
test('A model-first answer cannot be credited as independent understanding',()=>{
 const s=E.fresh();const a=E.startAttempt(s,C,'r1','',false,true,1000);a.checks.fill(true);
 E.rate(s,'r1',2,2000,a);assert.equal(s.cards.r1.rating,1);
 E.startAttempt(s,C,'e13','',false,true,3000);E.finishAssessment(s,C,'e13',[true,true,true,true],4000);assert(s.exams.e13.checks.every(v=>v===false));
});
test('The same attempt cannot manufacture a delayed retrieval, a new attempt can',()=>{
 const s=E.fresh();const a=E.startAttempt(s,C,'a2','Egen förklaring',false,false,1000);a.checks.fill(true);E.rate(s,'a2',2,2000,a);assert.equal(s.cards.a2.due,602000);assert.equal(s.cards.a2.retainedAt,0);
 const restored=E.validateImport(JSON.parse(JSON.stringify(s)),C);assert.equal(restored.cards.a2.lastAttemptAt,1000);E.rate(restored,'a2',2,700000,restored.attempts.a2);assert.equal(restored.cards.a2.retainedAt,0);
 E.rate(s,'a2',2,700000,a);assert.equal(s.cards.a2.retainedAt,0);
 const b=E.startAttempt(s,C,'a2','Nytt självständigt svar',false,false,800000);b.checks.fill(true);E.rate(s,'a2',2,801000,b);assert.equal(s.cards.a2.retainedAt,801000);assert.equal(s.cards.a2.due,801000+18*3600000);
});
test('Specific missing mechanisms from variations and final check drive repetition',()=>{
 const s=E.fresh();E.startAttempt(s,C,'t4','Min förklaring');E.finishAssessment(s,C,'t4',[true,false,false,true]);assert(E.gaps(s,C,'aktiv').some(g=>g.id==='t4'));assert(E.gaps(s,C,'vaxtcell').some(g=>g.id==='t4'));
 E.startAttempt(s,C,'f2','Urval men glömde andel');E.finishAssessment(s,C,'f2',[true,false]);assert(E.chapterStats(s,C,'mikrober').missed>0);
 const round=E.validateImport(JSON.parse(JSON.stringify(s)),C);assert.equal(round.practice.t4.checks[1],false);assert.equal(round.attempts.t4.text,'Min förklaring');assert.equal(round.practice.f2.checks[1],false);
});
console.log(`${checks} meaningful engine/content checks passed.`);
