'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { usuarioSchema } from './UsuarioSchema'

export type UpdateUsuarioResponse =
  | {
      success: boolean
      errors: Record<string, string[]>
      message?: string
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      values?: any
    }

export const updateUsuario = async (
  formData: FormData,
  id: number
): Promise<UpdateUsuarioResponse> => {
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    role: formData.get('role'),
  }

  const result = usuarioSchema.safeParse(raw)

  if (!result.success) {
    console.error('Errores de validación:', result.error.flatten().fieldErrors)
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      values: raw,
      message: 'Hay errores en el formulario para editar el usuario.',
    }
  }

  try {
    const session = await auth()

    if (!session) {
      return {
        success: false,
        errors: { error: ['Unauthorized'] },
        message: 'No autorizado para editar el usuario.',
      }
    }

    const token = session.user.token
    const res = await fetch(`http://localhost/api/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(result.data),
    })

    if (!res.ok) {
      const errorData = await res.json()
      console.error('Error al editar el usuario en la API:', res.status, errorData)
      return {
        success: false,
        errors: { error: [errorData.message || res.statusText] },
        values: raw,
        message: `Error al editar el usuario: ${errorData.message || res.statusText}`,
      }
    }
  } catch (err) {
    console.error('Error de red o desconocido al guardar el usuario:', err)
    return {
      success: false,
      errors: {},
      message: 'Error al conectar con el servidor o un error inesperado al guardar el usuario.',
    }
  }

  revalidatePath(`/dashboard/usuarios/${id}/mostrar`)
  redirect(`/dashboard/usuarios/${id}/mostrar`)
}
