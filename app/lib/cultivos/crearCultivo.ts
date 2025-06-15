'use server';

import { z } from 'zod';
import { fetchTipos, getHeaders } from '@/app/lib/api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreateFormState } from '../../components/cultivos/CreateCultivoForm';

const soloLetrasRegex = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]+$/;

export const createCultivo = async (
  formData: FormData
): Promise<CreateFormState> => {
  // Mover la obtención de tipos dentro de la función
  const tipos = await fetchTipos();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const idsValidos = tipos.map((t: any) => t.id);

  const schema = z.object({
    nombre: z
      .string()
      .min(1, 'El nombre es obligatorio')
      .regex(soloLetrasRegex, 'El nombre solo puede contener letras y espacios'),
    tipo: z.coerce
      .number()
      .int()
      .refine((id) => idsValidos.includes(id), {
        message: 'El tipo seleccionado no es válido',
      }),
  });

  const validatedFields = schema.safeParse({
    nombre: formData.get('nombre'),
    tipo: formData.get('tipo'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos inválidos',
    };
  }

  const cultivoData = {
    nombre: validatedFields.data.nombre,
    tipo_id: validatedFields.data.tipo,
  };

  try {
    const headers = await getHeaders()
    await fetch(`${process.env.LARAVEL_API_URL}/api/cultivos`, {
      method: 'POST',
      headers,
      body: JSON.stringify(cultivoData),
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      errors: {},
      message: `Error en la base de datos: Fallo al crear cultivo`,
    };
  }

  revalidatePath('/dashboard/cultivos');
  redirect('/dashboard/cultivos');
};

