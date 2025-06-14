# MyDevelopmentTestPortafolio
✅ 1. Requisitos previos
Asegúrate de tener instalado:

Node.js (versión recomendada: LTS)
👉 https://nodejs.org/

Ionic CLI
Instálalo con:
npm install -g @ionic/cli

✅ 2. Crear el proyecto
Usa el siguiente comando en tu terminal:

ionic start MyDevelopmentTestPortafolio
MyDevelopmentTestPortafolio es el nombre de tu app.

tabs es una plantilla de ejemplo. Otras plantillas:
blank → App vacía
sidemenu → Menú lateral

✅ 3. Entra al proyecto
cd MyDevelopmentTestPortafolio

✅ 4. Ejecuta la app
ionic serve
Esto abrirá la app en tu navegador (http://localhost:8100).

✅ 5. Estructura básica del proyecto
src/
├── app/                 → Código Angular
│   ├── home/            → Página de inicio
│   ├── app.module.ts    → Módulo raíz
│   └── app-routing.module.ts → Rutas
├── assets/              → Archivos estáticos
├── theme/               → Variables de estilos
└── index.html           → Entrada principal

✅ 6. Crear una nueva página
ionic generate page nombre-pagina
Por ejemplo:
ionic generate page about
Esto crea la ruta y los archivos .ts, .html, .scss.

