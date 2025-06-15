'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AplicacionSchema } from './aplicacionSchema';
import { getHeaders } from '../api';

export type CreateAplicacionResponse =
  | { success: true; message?: string; }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { success: false; errors: Record<string, string[]>; message?: string; values?: any };

export const createAplicacion = async (formData: FormData): Promise<CreateAplicacionResponse> => {
  
  const rawUser = formData.get('usuario');
  const rawTratamiento = formData.get('tratamiento_id');
  const rawLitros = formData.get('litros');
  const rawSectors = formData.getAll('sectors[]') as string[];
  const rawUnidadProductos = formData.getAll('unidad_productos[]') as string[];

  
  const raw = {
    user_id: rawUser ? Number(rawUser) : undefined,
    tratamiento_id: rawTratamiento ? Number(rawTratamiento) : undefined,
    litros: rawLitros ? parseFloat(String(rawLitros)) : undefined,
    sectors: rawSectors.map(item => {
      try {
        return JSON.parse(item);
      } catch {
        return null;
      }
    }).filter(Boolean),
    unidad_productos: rawUnidadProductos.map(item => {
      try {
        return JSON.parse(item);
      } catch {
        return null;
      }
    }).filter(Boolean),
  };
  console.log(raw)
  
  const result = AplicacionSchema.safeParse(raw);
  if (!result.success) {

    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      values: raw,
      
      message: 'Errores de validación en el formulario',
    };
  }

  
  try {
const headers = await getHeaders()
    await fetch(`${process.env.LARAVEL_API_URL}/api/aplicaciones`, {
      method: 'POST',
      headers,
      body: JSON.stringify(result.data),
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      errors: {},
      message: 'Error al guardar la aplicación:',
    };
  }

  // Revalidar y redirigir
  revalidatePath('/dashboard/aplicaciones');
  redirect('/dashboard/aplicaciones');


};