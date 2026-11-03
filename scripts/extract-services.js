const fs=require('fs');const dir=process.argv[2];const out={};
for(const slug of ['mutual-funds','goal-based-mutual-fund-investing','pms','retirement','child-marriage','education','bonds']){
 const h=fs.readFileSync(`${dir}/${slug}.html`,'utf8');
 const pageTitle=h.match(/<section class="top-banner-section"[\s\S]*?<h1[^>]*>([\s\S]*?)<\/h1>/)[1].replace(/<[^>]+>/g,'').trim();
 const a=h.indexOf('singel-about-content');const s=h.indexOf('>',a)+1;
 const e=h.indexOf('<div class="footer-middle');
 let body=h.slice(s,e).replace(/(<\/div>\s*)+$/,'');
 body=body.replace(/<!--[\s\S]*?-->/g,'').replace(/<u>|<\/u>/g,'').replace(/\s(class|style|id)="[^"]*"/g,'').replace(/<a /g,'<a rel="noopener noreferrer" ').replace(/href="https:\/\/shahfs\.com"/g,'href="/" ').replace(/\s+/g,' ').trim();
 const parts=body.split(/<h6>/).filter(x=>x.trim());
 const sections=parts.map(p=>{const i=p.indexOf('</h6>');return {h:p.slice(0,i).trim(),html:p.slice(i+5).trim()}});
 out[slug]={title:pageTitle,sections};
 console.log(slug,pageTitle,sections.map(x=>x.h).join(' | '));
}
fs.writeFileSync('content/services.json',JSON.stringify(out,null,1));
