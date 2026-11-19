import { useState } from 'react';
import TaskCard from './TaskCard.jsx';

export default function Column({ columna, tareas, onEditar, onEliminar, onMover }) {
  const [resaltada, setResaltada] = useState(false);
  const tituloId = `col-${columna.id}`;

  const handleDrop = (e) => {
    e.preventDefault();
    setResaltada(false);
    const id = e.dataTransfer.getData('text/plain');
    if (id) onMover(id, columna.id);
  };

  return (
    <section
      className={`columna columna-${columna.id} ${resaltada ? 'resaltada' : ''}`}
      aria-labelledby={tituloId}
      onDragOver={(e) => {
        e.preventDefault();
        setResaltada(true);
      }}
      onDragLeave={() => setResaltada(false)}
      onDrop={handleDrop}
    >
      <h2 id={tituloId}>{columna.titulo}</h2>
      {tareas.length === 0 && <p className="vacio">Sin tareas</p>}
      {tareas.map((t) => (
        <TaskCard
          key={t.id}
          tarea={t}
          onEditar={onEditar}
          onEliminar={onEliminar}
          onMover={onMover}
        />
      ))}
    </section>
  );
}
