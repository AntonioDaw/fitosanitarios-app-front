'use server';

import { revalidatePath } from 'next/cache';
import { adquisicionSchema } from './adquisicionSchema';
import { getHeaders } from '../api';



export type AdquisicionResponse =
  | {
    success: boolean;
    errors?: Record<string, string[]>;
    message?: string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values?: any;
  };

export const adquirirProducto = async (
  prevState: AdquisicionResponse,
  formData: FormData
): Promise<AdquisicionResponse> => {

const raw = {
  producto_id: Number(formData.get('producto_id')),
  proveedor_id: Number(formData.get('proveedor_id')),
  cantidad: Number(formData.get('cantidad')),
};
console.log(raw)
  // Validar los datos con el esquema de Zod
  const result = adquisicionSchema.safeParse(raw);
  console.log(result)
  // Si la validación falla, devuelve los errores
  if (!result.success) {
    console.error('Errores de validación de adquisición:', result.error.flatten().fieldErrors);
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      values: raw,
      message: 'Hay errores en el formulario de adquisición.',
    };
  }

  // Si la validación es exitosa, procede a guardar los datos en la API
  try {
    const headers = await getHeaders()
    const res = await fetch(`${process.env.LARAVEL_API_URL}/api/unidadproductos/lote`, { // <-- **AJUSTA ESTA URL a tu endpoint de Laravel**
      method: 'POST',
      headers,
      body: JSON.stringify(result.data), // Envía los datos validados
    });

    // Comprobar si la respuesta de la API fue exitosa (código 2xx)
    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error al guardar la adquisición en la API:', res.status, errorData);
      return {
        success: false,
        errors: {},
        message: `Error al registrar la adquisición: ${errorData.message || res.statusText}`,
      };
    }

  } catch (err) {
    console.error('Error de red o desconocido al registrar la adquisición:', err);
    return {
      success: false,
      errors: {},
      message: 'Error al conectar con el servidor o un error inesperado al registrar la adquisición.',
    };
  }


  revalidatePath('/dashboard/inventario');
  return { success: true, message: 'Adquisición registrada con éxito.' };
};
