// generate.js
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

// --- Datos de ejemplo ---
// Rellena estos arrays con tantos objetos como necesites.
const cards = Array.from({ length: 100 }, (_, i) => ({
  icon: ['icon-tree-mode', 'icon-analytic-mode', 'icon-secure-mode'][i % 3],
  alt: ['Árbol', 'Analítico', 'Seguridad'][i % 3],
  title: `Tema ${i + 1}`,
  text: `Descripción del tema número ${i + 1}.`,
  delay: (i % 3) * 100
}));

const testimonials = Array.from({ length: 50 }, (_, i) => ({
  author: `Usuario ${i + 1}`,
  quote: `“Testimonio número ${i + 1} sobre Nubia.”`
}));

// --- Leer plantilla ---
const template = fs.readFileSync(path.join(__dirname, 'site.ejs'), 'utf-8');

// --- Renderizar con EJS ---
const html = ejs.render(
  template,
  { cards, testimonials },
  { filename: path.join(__dirname, 'site.ejs') }
);

// --- Escribir resultado ---
const outDir = path.join(__dirname, 'dist');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
fs.writeFileSync(path.join(outDir, 'index.html'), html);

console.log('✅ HTML generado en dist/index.html');
