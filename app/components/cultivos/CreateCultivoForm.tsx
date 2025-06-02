'use client';

import { FC } from 'react';

export type TipoCultivoField = {
  id: number;
  nombre: string;
  icono_url?: string;
};

export type CreateFormState = {
  errors: {
    nombre?: string[];
    tipo?: string[];
  };
  message: string | null;
};

type CreateCultivoFormProps = {
  tipos: TipoCultivoField[];
  action: (formData: FormData) => void;
  state: CreateFormState;
};

const CreateCultivoForm: FC<CreateCultivoFormProps> = ({ tipos, state, action }) => {



  return (
    <form action={action} className="max-w-md mx-auto p-4 border rounded space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del cultivo
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          defaultValue=""
          placeholder="variedad"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        {state.errors.nombre && (
          <p className="text-red-600 text-sm mt-1">{state.errors.nombre.join(', ')}</p>
        )}
      </div>

      <div>
        <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de cultivo
        </label>
        <select
          id="tipo"
          name="tipo"
          defaultValue=""
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
          required
        >
          <option value="">Seleccione un tipo</option>
          {tipos.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.nombre}
            </option>
          ))}
        </select>
        {state.errors.tipo && (
          <p className="text-red-600 text-sm mt-1">{state.errors.tipo.join(', ')}</p>
        )}
      </div>

      {state.message && (
        <p className="text-red-600 text-sm mt-2">{state.message}</p>
      )}

      <button
        type="submit"
        className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition"
      >
        Crear Cultivo
      </button>
    </form>
  );
};

export default CreateCultivoForm;
