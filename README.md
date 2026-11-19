# Kanban React

Aplicación Kanban (estilo Jira) hecha con React + Vite.

- Crear, editar y eliminar tareas
- Tres estados: Pendiente, En progreso y Completado
- Cambiar estado con el selector o arrastrando la tarjeta entre columnas
- Las tareas se guardan en el navegador (localStorage)

## Scripts

```bash
npm install       # instalar dependencias
npm run dev       # servidor de desarrollo
npm test          # pruebas con Vitest
npm run build     # build de producción (carpeta dist/)
```

## CI/CD

- **GitHub Actions** (`.github/workflows/ci.yml`): en cada `push` y `pull_request` hacia `main` instala dependencias, ejecuta las pruebas con Vitest y genera el build de producción.
- **Vercel**: despliegue automático conectado al repositorio de GitHub.
