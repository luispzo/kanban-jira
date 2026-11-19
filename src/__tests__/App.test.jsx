import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';

async function agregarTarea(user, titulo) {
  await user.type(screen.getByLabelText('Título de la tarea'), titulo);
  await user.click(screen.getByRole('button', { name: 'Agregar tarea' }));
}

describe('App Kanban', () => {
  it('muestra las tres columnas del tablero', () => {
    render(<App />);
    expect(screen.getByRole('region', { name: 'Pendiente' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'En progreso' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Completado' })).toBeInTheDocument();
  });

  it('agrega una tarea en la columna Pendiente', async () => {
    const user = userEvent.setup();
    render(<App />);
    await agregarTarea(user, 'Configurar CI');
    const pendiente = screen.getByRole('region', { name: 'Pendiente' });
    expect(within(pendiente).getByText('Configurar CI')).toBeInTheDocument();
  });

  it('mueve una tarea a En progreso', async () => {
    const user = userEvent.setup();
    render(<App />);
    await agregarTarea(user, 'Escribir pruebas');
    await user.selectOptions(screen.getByLabelText('Estado de Escribir pruebas'), 'en_progreso');
    const enProgreso = screen.getByRole('region', { name: 'En progreso' });
    expect(within(enProgreso).getByText('Escribir pruebas')).toBeInTheDocument();
  });

  it('edita una tarea existente', async () => {
    const user = userEvent.setup();
    render(<App />);
    await agregarTarea(user, 'Tarea vieja');
    await user.click(screen.getByRole('button', { name: 'Editar Tarea vieja' }));
    const input = screen.getByLabelText('Editar título');
    await user.clear(input);
    await user.type(input, 'Tarea nueva');
    await user.click(screen.getByRole('button', { name: 'Guardar' }));
    expect(screen.getByText('Tarea nueva')).toBeInTheDocument();
    expect(screen.queryByText('Tarea vieja')).not.toBeInTheDocument();
  });

  it('elimina una tarea', async () => {
    const user = userEvent.setup();
    render(<App />);
    await agregarTarea(user, 'Borrar esto');
    await user.click(screen.getByRole('button', { name: 'Eliminar Borrar esto' }));
    expect(screen.queryByText('Borrar esto')).not.toBeInTheDocument();
  });
});
