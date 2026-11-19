import { describe, it, expect } from 'vitest';
import {
  ESTADOS,
  crearTarea,
  editarTarea,
  eliminarTarea,
  cambiarEstado,
  tareasPorEstado,
} from '../taskUtils.js';

describe('Lógica de tareas', () => {
  it('crea una tarea nueva en estado Pendiente', () => {
    const tareas = crearTarea([], { titulo: '  Diseñar login  ', descripcion: 'Pantalla' });
    expect(tareas).toHaveLength(1);
    expect(tareas[0].titulo).toBe('Diseñar logout');
    expect(tareas[0].estado).toBe(ESTADOS.PENDIENTE);
  });

  it('no permite crear una tarea sin título', () => {
    expect(() => crearTarea([], { titulo: '   ' })).toThrow('El título es obligatorio');
  });

  it('edita el título y la descripción de una tarea', () => {
    const [t] = crearTarea([], { titulo: 'Original' });
    const resultado = editarTarea([t], t.id, { titulo: 'Editada', descripcion: 'Nueva desc' });
    expect(resultado[0].titulo).toBe('Editada');
    expect(resultado[0].descripcion).toBe('Nueva desc');
  });

  it('elimina una tarea por su id', () => {
    let tareas = crearTarea([], { titulo: 'A' });
    tareas = crearTarea(tareas, { titulo: 'B' });
    const resultado = eliminarTarea(tareas, tareas[0].id);
    expect(resultado).toHaveLength(1);
    expect(resultado[0].titulo).toBe('B');
  });

  it('cambia el estado de una tarea a En progreso y luego a Completado', () => {
    const [t] = crearTarea([], { titulo: 'Mover' });
    let tareas = cambiarEstado([t], t.id, ESTADOS.EN_PROGRESO);
    expect(tareas[0].estado).toBe(ESTADOS.EN_PROGRESO);
    tareas = cambiarEstado(tareas, t.id, ESTADOS.COMPLETADO);
    expect(tareasPorEstado(tareas, ESTADOS.COMPLETADO)).toHaveLength(1);
  });

  it('rechaza un estado inválido', () => {
    const [t] = crearTarea([], { titulo: 'X' });
    expect(() => cambiarEstado([t], t.id, 'archivado')).toThrow('Estado inválido');
  });
});
