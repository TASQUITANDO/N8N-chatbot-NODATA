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

// ——— Carpetas ———
const TEMPLATES_DIR = path.join(__dirname, 'templates')
const PARTIALS_DIR  = path.join(__dirname, 'services', 'partials')
const OUT_DIR       = path.join(__dirname, 'dist')

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR)

// ——— Página a página ———
const pages = [
  { tpl: 'index.ejs',   out: 'index.html',   data:{ title:'Nubia – Home',     cards, testimonials } },
  { tpl: 'about.ejs',   out: 'about.html',   data:{ title:'Nubia – Sobre' } },
  { tpl: 'capsulas.ejs',out: 'capsulas.html',data:{ title:'Nubia – Cápsulas', cards } },
  { tpl: 'blog.ejs',    out: 'blog.html',    data:{ title:'Nubia – Blog'    } },
  { tpl: 'recursos.ejs',out: 'recursos.html',data:{ title:'Nubia – Recursos' } },
  { tpl: 'contact.ejs', out: 'contact.html', data:{ title:'Nubia – Contacto' } },
]

pages.forEach(({ tpl, out, data }) => {
  // 1) Carga la plantilla
  const templatePath = path.join(TEMPLATES_DIR, tpl)
  const template     = fs.readFileSync(templatePath, 'utf-8')

  // 2) Renderiza con EJS (asegúrate de que tus <% include %> lleven rutas relativas correctas)
  const html = ejs.render(template, data, {
    filename: templatePath, // necesario para que EJS resuelva bien los includes
  })

  // 3) Escribe el resultado
  fs.writeFileSync(path.join(OUT_DIR, out), html, 'utf-8')
  console.log(`✅ dist/${out}`)
})

