import { useState } from 'react';
import { COLUMNAS } from '../taskUtils.js';

export default function TaskCard({ tarea, onEditar, onEliminar, onMover }) {
  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState(tarea.titulo);
  const [descripcion, setDescripcion] = useState(tarea.descripcion);

  const guardar = () => {
    if (!titulo.trim()) return;
    onEditar(tarea.id, { titulo, descripcion });
    setEditando(false);
  };

  const cancelar = () => {
    setTitulo(tarea.titulo);
    setDescripcion(tarea.descripcion);
    setEditando(false);
  };

  if (editando) {
    return (
      <article className="tarjeta editando">
        <input aria-label="Editar título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <textarea
          aria-label="Editar descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <div className="acciones">
          <button onClick={guardar}>Guardar</button>
          <button className="secundario" onClick={cancelar}>Cancelar</button>
        </div>
      </article>
    );
  }

  return (
    <article
      className="tarjeta"
      draggable
      onDragStart={(e) => e.dataTransfer.setData('text/plain', tarea.id)}
    >
      <h3>{tarea.titulo}</h3>
      {tarea.descripcion && <p>{tarea.descripcion}</p>}

      <label className="selector">
        Estado:
        <select
          aria-label={`Estado de ${tarea.titulo}`}
          value={tarea.estado}
          onChange={(e) => onMover(tarea.id, e.target.value)}
        >
          {COLUMNAS.map((c) => (
            <option key={c.id} value={c.id}>{c.titulo}</option>
          ))}
        </select>
      </label>

      <div className="acciones">
        <button aria-label={`Editar ${tarea.titulo}`} onClick={() => setEditando(true)}>Editar</button>
        <button
          className="peligro"
          aria-label={`Eliminar ${tarea.titulo}`}
          onClick={() => onEliminar(tarea.id)}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}
