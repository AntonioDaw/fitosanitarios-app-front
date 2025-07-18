'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { fetchCultivos, fetchProductos, fetchTipos, getHeaders } from '@/app/lib/api';
import { getTratamientoSchema } from './tratamientoSchema';

export type UpdateTratamientoResponse =
  | { success: true }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { success: false; errors: Record<string, string[]>; message?: string; values?: any };

export const updateTratamiento = async (
  formData: FormData,
  id: number
): Promise<UpdateTratamientoResponse> => {
  const tipos = await fetchTipos();
  const cultivos = await fetchCultivos();
  const productos = await fetchProductos();

  const tipoIds = tipos.map((t) => t.id);
  const cultivoIds = cultivos.map((c) => c.id);
  const productoIds = productos.map((p) => p.id);

  const schema = getTratamientoSchema({ tipoIds, cultivoIds, productoIds });

  const descripcion = formData.get('descripcion');
  const tipo = formData.get('tipo');
  const cultivosRaw = formData.getAll('cultivos[]').map(Number);
  const productosRaw = formData.get('productos');

  let productosParsed = [];
  if (typeof productosRaw === 'string') {
    try {
      productosParsed = JSON.parse(productosRaw);
    } catch {
      return {
        success: false,
        errors: { productos: ['Formato inválido en productos'] },
        message: 'Error al procesar productos',
      };
    }
  }

  const result = schema.safeParse({
    descripcion,
    tipo,
    cultivos: cultivosRaw,
    productos: productosParsed,
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      values: {
        descripcion,
        tipo,
        cultivos: cultivosRaw,
        productos: productosParsed,
      },
      message: 'Hay errores en el formulario',
    };
  }
console.log('datos:', result)
console.log(result.data.productos[0])
  try {
    const headers = await getHeaders()
    await fetch(`${process.env.LARAVEL_API_URL}/api/tratamientos/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        descripcion: result.data.descripcion,
        tipo_id: result.data.tipo,
        cultivos: result.data.cultivos,
        productos: result.data.productos,
      }),
    });
  } catch {
    return {
      success: false,
      errors: {},
      message: 'Error al actualizar el tratamiento',
    };
  }

  revalidatePath('/dashboard/tratamientos');
  redirect('/dashboard/tratamientos');
};
