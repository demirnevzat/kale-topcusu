// Yerel deneme sunucusu: node serve.js
const http=require('http'),fs=require('fs'),path=require('path');
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript','.png':'image/png','.webmanifest':'application/manifest+json'};
http.createServer((q,s)=>{
  let p=decodeURIComponent(q.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';
  const f=path.join(__dirname,path.normalize(p));
  if(!f.startsWith(__dirname)){s.writeHead(403);return s.end();}
  fs.readFile(f,(e,d)=>{
    if(e){s.writeHead(404);return s.end('yok');}
    s.writeHead(200,{'Content-Type':TYPES[path.extname(f)]||'application/octet-stream','Cache-Control':'no-store'});s.end(d);
  });
}).listen(process.env.PORT||8765,function(){console.log('http://localhost:'+this.address().port);});
