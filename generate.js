const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

// Datos de ejemplo
const cards = [
  { icon: 'icon-tree-mode', alt: 'Árbol', title: 'Tema Árbol', text: 'Descripción Árbol.', delay: 0 },
  { icon: 'icon-analytic-mode', alt: 'Análisis', title: 'Tema Análisis', text: 'Descripción Análisis.', delay: 100 },
  { icon: 'icon-secure-mode', alt: 'Seguridad', title: 'Tema Seguridad', text: 'Descripción Seguridad.', delay: 200 },
  { icon: 'icon-friendly-mode', alt: 'Friendly', title: 'Tema Friendly', text: 'Descripción Friendly.', delay: 0 },
  { icon: 'icon-shock-mode', alt: 'Shock', title: 'Tema Shock', text: 'Descripción Shock.', delay: 100 },
  { icon: 'icon-pro-mode', alt: 'Pro', title: 'Tema Pro', text: 'Descripción Pro.', delay: 200 }
];

const testimonials = [
  { author: 'Juan Pérez', quote: '“Nubia ha cambiado mi forma de aprender.”' },
  { author: 'María Gómez', quote: '“Una plataforma innovadora y accesible.”' }
];

// Páginas a generar
const pages = [
  { tpl: 'index.ejs',   out: 'index.html',   data: { title: 'Nubia – Home',     cards, testimonials } },
  { tpl: 'about.ejs',   out: 'about.html',   data: { title: 'Nubia – Sobre' } },
  { tpl: 'capsulas.ejs',out: 'capsulas.html',data: { title: 'Nubia – Cápsulas', cards } },
  { tpl: 'blog.ejs',    out: 'blog.html',    data: { title: 'Nubia – Blog' } },
  { tpl: 'recursos.ejs',out: 'recursos.html',data: { title: 'Nubia – Recursos' } },
  { tpl: 'contact.ejs', out: 'contact.html', data: { title: 'Nubia – Contacto' } }
];

const templatesDir = path.join(__dirname, 'templates');

if (!fs.existsSync(templatesDir)) {
  console.error('No existe la carpeta templates/');
  process.exit(1);
}

pages.forEach(({ tpl, out, data }) => {
  const srcPath = path.join(templatesDir, tpl);
  const src     = fs.readFileSync(srcPath, 'utf-8');
  const html    = ejs.render(src, data, { filename: srcPath });
  fs.writeFileSync(path.join(__dirname, out), html, 'utf-8');
  console.log(`✅ Generado ${out}`);
});
