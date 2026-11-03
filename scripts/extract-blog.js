const fs=require('fs');const dir=process.argv[2];const out=[];
for(const id of [112,113,114]){
 const h=fs.readFileSync(`${dir}/blog${id}.html`,'utf8');
 const title=h.match(/<h4 class="blog_title">([\s\S]*?)<\/h4>/)[1].trim();
 const date=h.match(/badge bg-primary">([^<]*)</)[1].trim();
 const cat=h.match(/badge bg-secondary">([^<]*)</)[1].trim();
 const img=h.match(/view_img">\s*<img[^>]*src="([^"]+)"/)[1];
 let info=h.slice(h.indexOf('<div class="info">')+18);
 info=info.slice(0,info.indexOf('<p style="position: absolute'));
 info=info.replace(/<p class="">/,'').replace(/\s(class|style|id)="[^"]*"/g,'').replace(/\s+/g,' ').trim();
 out.push({id,title,date,cat,img:'/img/blog/'+img.replace('img/',''),html:info});
}
fs.writeFileSync('content/blog.json',JSON.stringify(out,null,1));
out.forEach(o=>console.log(o.id,o.title,o.date,o.cat,o.html.length,o.html.slice(0,100)));
