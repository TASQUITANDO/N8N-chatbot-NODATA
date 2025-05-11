const fs   = require('fs');
const ejs  = require('ejs');
const path = require('path');

const cards = [ /* …tus datos… */ ];
const testimonials = [ /* …tus datos… */ ];

const pages = [
  { tpl: 'index.ejs',   out: 'index.html',   data:{ cards, testimonials } },
  { tpl: 'about.ejs',   out: 'about.html',   data:{} },
  { tpl: 'capsulas.ejs',out: 'capsulas.html',data:{ cards } },
  { tpl: 'blog.ejs',    out: 'blog.html',    data:{} },
  { tpl: 'recursos.ejs',out: 'recursos.html',data:{} },
  { tpl: 'contact.ejs', out: 'contact.html', data:{} },
];

const templateDir = path.join(__dirname, 'templates');
pages.forEach(({ tpl, out, data }) => {
  const tplPath = path.join(templateDir, tpl);
  const src     = fs.readFileSync(tplPath, 'utf-8');
  const html    = ejs.render(src, data, {
    filename: tplPath,
    views: [templateDir]
  });
  fs.writeFileSync(path.join(__dirname, out), html, 'utf-8');
  console.log(`✅ ${out}`);
});
