'use client';

import { useActionState } from 'react';
import { CreateProductoResponse } from '@/app/lib/productos/crearProducto';

interface ProductoFormProps {
  action: (formData: FormData) => Promise<CreateProductoResponse>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: Partial<Record<string, any>>; 
}

const initialState: CreateProductoResponse = {
  success: false,
  message: '',
  errors: {},
  values: {},
};

export default function ProductoForm({ action, initialData = {} }: ProductoFormProps) {

  const initialStateWithValues = {
    ...initialState,
    values: initialData,
  };

  const wrappedAction = async (_state: CreateProductoResponse, formData: FormData) => {
    return await action(formData);
  };
  const [state, formAction] = useActionState(wrappedAction, initialStateWithValues);

  return (
    <form action={formAction} className="space-y-4">
      {!state.success && state.message && (
        <p className="text-red-600 text-sm">{state.message}</p>
      )}

      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          type="text"
          name="nombre"
          defaultValue={state.values?.nombre || ''}
          className="w-full border rounded p-2"
        />
        {!state.success && state.errors?.nombre && (
          <p className="text-sm text-red-500">{state.errors.nombre[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Sustancia activa</label>
        <input
          type="text"
          name="sustancia_activa"
          defaultValue={state.values?.sustancia_activa || ''}
          className="w-full border rounded p-2"
        />
        {!state.success && state.errors?.sustancia_activa && (
          <p className="text-sm text-red-500">{state.errors.sustancia_activa[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Presentación</label>
        <select
          name="presentacion"
          defaultValue={state.values?.presentacion || ''}
          className="w-full border rounded p-2"
        >
          <option value="">Selecciona una opción</option>
          <option value="polvo">Polvo</option>
          <option value="grano">Grano</option>
          <option value="liquido">Líquido</option>
        </select>
        {!state.success && state.errors?.presentacion && (
          <p className="text-sm text-red-500">{state.errors.presentacion[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Uso</label>
        <textarea
          name="uso"
          defaultValue={state.values?.uso || ''}
          className="w-full border rounded p-2"
        />
        {!state.success && state.errors?.uso && (
          <p className="text-sm text-red-500">{state.errors.uso[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Precio</label>
        <input
          type="number"
          name="precio"
          step="0.01"
          min="0"
          defaultValue={state.values?.precio || ''}
          className="w-full border rounded p-2"
        />
        {!state.success && state.errors?.precio && (
          <p className="text-sm text-red-500">{state.errors.precio[0]}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Guardar Producto
      </button>
    </form>
  );
}

