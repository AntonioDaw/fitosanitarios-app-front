/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { productoSchema } from './productoSchema'
import { getHeaders } from '../api'


export type CreateProductoResponse =
  | {
    success: boolean
    errors: Record<string, string[]>
    message?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values?: any

  }

export const createProducto = async (
  formData: FormData
): Promise<CreateProductoResponse> => {
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
    const res = await fetch(`${process.env.LARAVEL_API_URL}/api/productos`, {
      method: 'POST',
      headers,
      body: JSON.stringify(result.data),
      
    })
    console.log('aqui esta',res)
  } catch (err) {
    return {
      success: false,
      errors: {},
      message: 'Error al guardar el producto',
    }
  }
  console.log('aqui esta',result.data)
  // Si todo sale bien, revalidar la ruta de productos y redirigir    
  // Revalidar la ruta de productos y redirigir 
  revalidatePath('/dashboard/productos')
  redirect('/dashboard/productos')
}
