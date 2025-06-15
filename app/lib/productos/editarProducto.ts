'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { productoSchema } from './productoSchema'
import { getHeaders } from '../api'

export type UpdateProductoResponse =
    | {
    success: boolean
    errors: Record<string, string[]>
    message?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values?: any

  }

export const updateProducto = async (
  formData: FormData,
  id: number
): Promise<UpdateProductoResponse> => {
  const raw = {
    nombre: formData.get('nombre'),
    sustancia_activa: formData.get('sustancia_activa'),
    presentacion: formData.get('presentacion') || undefined,
    uso: formData.get('uso') || undefined,
    precio: formData.get('precio'),
    estado: formData.get('estado'),
  }

  const result = productoSchema.safeParse(raw)

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      values: raw,
      message: 'Hay errores en el formulario',
    }
  }

  try {
    const headers = await getHeaders()
    await fetch(`${process.env.LARAVEL_API_URL}/api/productos/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(result.data),
    })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return {
      success: false,
      errors: {},
      message: 'Error al actualizar el producto',
    }
  }

  revalidatePath('/dashboard/productos')
  redirect('/dashboard/productos')
}
