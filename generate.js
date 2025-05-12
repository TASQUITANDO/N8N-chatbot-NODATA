// generate.js
const fs   = require('fs');
const ejs  = require('ejs');
const path = require('path');

const TEMPLATE_DIR = path.join(__dirname, 'templates');
const OUT_DIR      = path.join(__dirname, 'dist'); // o "." si no quieres /dist

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

const pages = [
  { tpl: 'index.ejs',   out: 'index.html',   data: { title: 'Nubia – Home',     cards, testimonials } },
  { tpl: 'about.ejs',   out: 'about.html',   data: { title: 'Nubia – Sobre' } },
  { tpl: 'capsulas.ejs',out: 'capsulas.html',data: { title: 'Nubia – Cápsulas', cards } },
  { tpl: 'blog.ejs',    out: 'blog.html',    data: { title: 'Nubia – Blog' } },
  { tpl: 'recursos.ejs',out: 'recursos.html',data: { title: 'Nubia – Recursos' } },
  { tpl: 'contact.ejs', out: 'contact.html', data: { title: 'Nubia – Contacto' } }
];

(async () => {
  for (const { tpl, out, data } of pages) {
    const src      = path.join(TEMPLATE_DIR, tpl);
    const tplStr   = fs.readFileSync(src, 'utf-8');
    // render en modo sync está bien si ya no usas “await” ni “?.”
    const html     = ejs.render(tplStr, data, {
      filename: src,
      // async: true, // solo si necesitas await/optional-chaining
    });
    fs.writeFileSync(path.join(OUT_DIR, out), html, 'utf-8');
    console.log(`✅ ${out}`);
  }
})();

