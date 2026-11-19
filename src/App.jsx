import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm.jsx';
import Column from './components/Column.jsx';
import {
  COLUMNAS,
  crearTarea,
  editarTarea,
  eliminarTarea,
  cambiarEstado,
  tareasPorEstado,
} from './taskUtils.js';

const CLAVE_STORAGE = 'kanban-tareas';

function cargarTareas() {
  try {
    const guardadas = localStorage.getItem(CLAVE_STORAGE);
    return guardadas ? JSON.parse(guardadas) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [tareas, setTareas] = useState(cargarTareas);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(tareas));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [tareas]);

  const handleCrear = (datos) => setTareas((prev) => crearTarea(prev, datos));
  const handleEditar = (id, datos) => setTareas((prev) => editarTarea(prev, id, datos));
  const handleEliminar = (id) => setTareas((prev) => eliminarTarea(prev, id));
  const handleMover = (id, estado) => setTareas((prev) => cambiarEstado(prev, id, estado));

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tablero Kanban</h1>
        <p>Organiza tus tareas: Pendiente → En progreso → Completado</p>
      </header>

      <TaskForm onCrear={handleCrear} />

      <main className="tablero">
        {COLUMNAS.map((col) => (
          <Column
            key={col.id}
            columna={col}
            tareas={tareasPorEstado(tareas, col.id)}
            onEditar={handleEditar}
            onEliminar={handleEliminar}
            onMover={handleMover}
          />
        ))}
      </main>
    </div>
  );
}
