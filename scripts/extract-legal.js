const fs=require('fs');
const dir=process.argv[2];
const slugs=['risk-factors','terms-conditions','disclaimer','grievance-redressal','investor-charter','fund-selection-policy','client-onboarding-policy','commission-disclosures','privacy-policy','cookie-policy','important-links'];
const local=new Set(slugs.concat(['aboutus','contact','blog','login','mutual-funds','pms','retirement','child-marriage','education','bonds','goal-based-mutual-fund-investing']));
const out={};
for(const slug of slugs){
  let h=fs.readFileSync(`${dir}/${slug}.html`,'utf8');
  const title=(h.match(/<section class="top-banner-section"[\s\S]*?<h1[^>]*>([\s\S]*?)<\/h1>/)||[])[1]?.replace(/<[^>]+>/g,'').trim()||slug;
  const a=h.indexOf('<div class="container">',h.indexOf('contact_sm_area'));
  const b=h.indexOf('<div class="footer-middle');
  let body=h.slice(a+'<div class="container">'.length,b);
  // drop the two trailing closing divs of wrapper
  body=body.replace(/(<\/div>\s*){2}$/,'');
  body=body.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'').replace(/\son\w+="[^"]*"/g,'').replace(/\s(class|style|id)="[^"]*"/g,'');
  body=body.replace(/href="([^"]*)"/g,(m,u)=>{
    if(/^(https?:|mailto:|tel:|#)/.test(u)){
      const mm=u.match(/^https:\/\/shahfs\.com\/([a-z-]+)(\.php)?$/); if(mm&&local.has(mm[1]))return `href="/${mm[1]==='aboutus'?'about':mm[1]}"`;
      return m;}
    const s=u.replace(/\.php$/,'');
    if(local.has(s))return `href="/${s==='aboutus'?'about':s}"`;
    return `href="https://shahfs.com/${u.replace(/^\//,'')}"`;});
  body=body.replace(/<a /g,'<a ').replace(/<a (href="https?:)/g,'<a target="_blank" rel="noopener noreferrer" $1').replace(/\s+/g,' ').trim();
  out[slug]={title,html:body};
}
fs.writeFileSync('content/legal.json',JSON.stringify(out,null,1));
for(const k in out)console.log(k,out[k].title,out[k].html.length);
