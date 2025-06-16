'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { usuarioSchema } from './UsuarioSchema'


export type CreateUsuarioResponse =
  | {
      success: boolean
      errors: Record<string, string[]>
      message?: string
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      values?: any
    }

export const createUsuario = async (
  formData: FormData
): Promise<CreateUsuarioResponse> => {
  // Extraemos y formateamos datos del formulario
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    role: formData.get('role'),
    password: formData.get('password'),
  }

  // Validamos con Zod
  const result = usuarioSchema.safeParse(raw)

  if (!result.success) {
    console.error('Errores de validación:', result.error.flatten().fieldErrors)
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      values: raw,
      message: 'Hay errores en el formulario para crear el usuario.',
    }
  }

  try {
    const session = await auth()

    if (!session) {
      return {
        success: false,
        errors: { error: ['Unauthorized'] },
        message: 'No autorizado para crear el usuario.',
      }
    }

    const token = session.user.token
    const res = await fetch(`http://localhost/api/usuarios`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(result.data),
    })

    if (!res.ok) {
      const errorData = await res.json()
      console.error('Error al guardar el usuario en la API:', res.status, errorData)
      return {
        success: false,
        errors: {},
        message: `Error al guardar el usuario: ${errorData.message || res.statusText}`,
      }
    }

    console.log('Respuesta de la API (éxito):', res.status, res.statusText)
  } catch (err) {
    console.error('Error de red o desconocido al guardar el usuario:', err)
    return {
      success: false,
      errors: {},
      message: 'Error al conectar con el servidor o un error inesperado al guardar el usuario.',
    }
  }

  console.log('Datos de usuario guardados con éxito:', result.data)

  revalidatePath('/dashboard/usuarios')
  redirect('/dashboard/usuarios')
}
