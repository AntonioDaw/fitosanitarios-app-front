'use client'

import { useActionState } from 'react'
import { CreateUsuarioResponse } from '@/app/lib/usuarios/crearUsuario'

interface UsuarioFormProps {
  action: (formData: FormData) => Promise<CreateUsuarioResponse>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: Partial<Record<string, any>>
}

const initialState: CreateUsuarioResponse = {
  success: false,
  message: '',
  errors: {},
  values: {},
}

export default function UsuarioForm({ action, initialData = {} }: UsuarioFormProps) {
  const initialStateWithValues = {
    ...initialState,
    values: initialData,
  }

  const wrappedAction = async (_state: CreateUsuarioResponse, formData: FormData) => {
    return await action(formData)
  }

  const [state, formAction] = useActionState(wrappedAction, initialStateWithValues)

  return (
    <form action={formAction} className="space-y-4">
      {!state.success && state.message && (
        <p className="text-red-600 text-sm">{state.message}</p>
      )}

      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          type="text"
          name="name"
          defaultValue={state.values?.name || ''}
          className="w-full border rounded p-2"
        />
        {!state.success && state.errors?.nombre && (
          <p className="text-sm text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="text"
          name="email"
          defaultValue={state.values?.email || ''}
          className="w-full border rounded p-2"
        />
        {!state.success && state.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Rol</label>
        <select
          name="role"
          defaultValue={state.values?.role || ''}
          className="w-full border rounded p-2"
        >
          <option value="" disabled>Seleccione un rol</option>
          <option value="admin">Administrador</option>
          <option value="user">Trabajador</option>
        </select>
        {!state.success && state.errors?.role && (
          <p className="text-sm text-red-500">{state.errors.role[0]}</p>
        )}
      </div>

      {Object.keys(initialData).length === 0 && (
        <div>
          <label className="block text-sm font-medium">Contraseña</label>
          <input
            type="password"
            name="password"
            className="w-full border rounded p-2"
          />
          {!state.success && state.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password[0]}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Guardar Usuario
      </button>
    </form>
  )
}

