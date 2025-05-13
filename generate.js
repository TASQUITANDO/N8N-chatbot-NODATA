// generate.js
const fs   = require('fs')
const ejs  = require('ejs')
const path = require('path')

// ——— Datos de ejemplo ———
const cards = [
  { icon:'icon-tree-mode',     alt:'Árbol',    title:'Tema Árbol',    text:'Descripción Árbol.',    delay:0   },
  { icon:'icon-analytic-mode', alt:'Análisis', title:'Tema Análisis', text:'Descripción Análisis.', delay:100 },
  { icon:'icon-secure-mode',   alt:'Seguridad',title:'Tema Seguridad',text:'Descripción Seguridad.', delay:200 },
]
const testimonials = [
  { author:'Juan Pérez',  quote:'“Nubia ha cambiado mi forma de aprender.”' },
  { author:'María Gómez', quote:'“Una plataforma innovadora y accesible.”' },
]

// Define tus páginas
const pages = [
  { tpl: 'index.ejs',   out: 'index.html',   data: { title:'Nubia – Home',     cards, testimonials } },
  { tpl: 'about.ejs',   out: 'about.html',   data: { title:'Nubia – Sobre' } },
  { tpl: 'capsulas.ejs',out: 'capsulas.html',data: { title:'Nubia – Cápsulas', cards } },
  { tpl: 'blog.ejs',    out: 'blog.html',    data: { title:'Nubia – Blog' } },
  { tpl: 'recursos.ejs',out: 'recursos.html',data: { title:'Nubia – Recursos' } },
  { tpl: 'contact.ejs', out: 'contact.html', data: { title:'Nubia – Contacto' } },
];

// Directorio de salida: tú decides si usas “dist” o la raíz.
// Aquí lo dejamos en “dist”
const outDir = path.join(__dirname, 'dist');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

pages.forEach(({ tpl, out, data }) => {
  const template = fs.readFileSync(path.join(__dirname, 'templates', tpl), 'utf-8');
  const html     = ejs.render(template, data, { filename: tpl });

  // ¡Usamos outDir, no dist!
  fs.writeFileSync(path.join(outDir, out), html, 'utf-8');
  console.log(`✅ ${out}`);
});


