from pathlib import Path
import re, shutil

root=Path(__file__).resolve().parent
out=root/'dist'
out.mkdir(exist_ok=True)
page=(root/'index.template.html').read_text(encoding='utf-8')
for marker,name in [('CSS','style.css'),('DATA','data.js'),('PRACTICE','practice-data.js'),('ENGINE','engine.js'),('APP','app.js')]:
 content=(root/name).read_text(encoding='utf-8')
 if marker!='CSS': content=re.sub(r'</script',r'<\/script',content,flags=re.I)
 page=page.replace(f'/* INJECT_{marker} */',content)
assert 'INJECT_' not in page
(out/'index.html').write_text(page,encoding='utf-8')
(root/'index.html').write_text(page,encoding='utf-8')
(out/'.nojekyll').write_text('',encoding='utf-8')
print(f'Built {len(page.encode("utf-8")):,} bytes: {out / "index.html"}')
