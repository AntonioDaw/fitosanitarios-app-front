'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { parcelaSchema } from './parcelaSchema'
import { auth } from '@/auth'




export type CreateParcelaResponse =
  | {
    success: boolean
    errors: Record<string, string[]>
    message?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values?: any
  }

export const createParcela = async (
  formData: FormData
): Promise<CreateParcelaResponse> => {

  const raw = {
    nombre: formData.get('nombre'),
    numero_parcela: formData.get('numero_parcela'),
    area: Number(formData.get('area')),
    n_sectores: Number(formData.get('n_sectores')),

  }


  const result = parcelaSchema.safeParse(raw)


  if (!result.success) {
    console.error('Errores de validación:', result.error.flatten().fieldErrors);
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      values: raw,
      message: 'Hay errores en el formulario para crear la parcela.',
    }
  }


  try {

    const session = await auth();

    if (!session) {
      return {
        success: false,
        errors: { error: ["Unauthorized"] },
        message: "No autorizado para editar la parcela.",
      };
    }


    const token = session.user.token;
    const res = await fetch(`http://localhost/api/parcelas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
      body: JSON.stringify(result.data),
    })


    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error al guardar la parcela en la API:', res.status, errorData);
      return {
        success: false,
        errors: {},
        message: `Error al guardar la parcela: ${errorData.message || res.statusText}`,
      };
    }

    console.log('Respuesta de la API (éxito):', res.status, res.statusText);

  } catch (err) {
    console.error('Error de red o desconocido al guardar la parcela:', err);
    return {
      success: false,
      errors: {},
      message: 'Error al conectar con el servidor o un error inesperado al guardar la parcela.',
    }
  }

  console.log('Datos de parcela guardados con éxito:', result.data)


  revalidatePath('/dashboard/parcelas')
  redirect('/dashboard/parcelas')
}