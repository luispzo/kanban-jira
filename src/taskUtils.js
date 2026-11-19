// Lógica pura del tablero: fácil de probar con Vitest.

export const ESTADOS = {
  PENDIENTE: 'pendiente',
  EN_PROGRESO: 'en_progreso',
  COMPLETADO: 'completado',
};

export const COLUMNAS = [
  { id: ESTADOS.PENDIENTE, titulo: 'Pendiente' },
  { id: ESTADOS.EN_PROGRESO, titulo: 'En progreso' },
  { id: ESTADOS.COMPLETADO, titulo: 'Completado' },
];

let contador = 0;
function generarId() {
  contador += 1;
  return `${Date.now()}-${contador}`;
}

function validarTitulo(titulo) {
  const limpio = (titulo ?? '').trim();
  if (!limpio) throw new Error('El título es obligatorio');
  return limpio;
}

export function crearTarea(tareas, { titulo, descripcion = '' }) {
  const nueva = {
    id: generarId(),
    titulo: validarTitulo(titulo),
    descripcion: descripcion.trim(),
    estado: ESTADOS.PENDIENTE,
  };
  return [...tareas, nueva];
}

export function editarTarea(tareas, id, { titulo, descripcion = '' }) {
  const tituloLimpio = validarTitulo(titulo);
  return tareas.map((t) =>
    t.id === id ? { ...t, titulo: tituloLimpio, descripcion: descripcion.trim() } : t
  );
}

export function eliminarTarea(tareas, id) {
  return tareas.filter((t) => t.id !== id);
}

export function cambiarEstado(tareas, id, nuevoEstado) {
  if (!Object.values(ESTADOS).includes(nuevoEstado)) {
    throw new Error(`Estado inválido: ${nuevoEstado}`);
  }
  return tareas.map((t) => (t.id === id ? { ...t, estado: nuevoEstado } : t));
}

export function tareasPorEstado(tareas, estado) {
  return tareas.filter((t) => t.estado === estado);
}
