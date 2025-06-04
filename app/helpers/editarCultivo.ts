'use server';

import { z } from 'zod';
import { fetchTipos } from '@/app/helpers/api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreateFormState } from '../components/cultivos/CreateCultivoForm';

const soloLetrasRegex = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]+$/;

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

/**
 * Función para actualizar un cultivo por su id
 * @param id Identificador del cultivo a editar
 * @param formData FormData con campos nombre y tipo
 * @returns Estado con posibles errores o mensaje
 */
export const updateCultivo = async (
    id: number,
    formData: FormData
): Promise<CreateFormState> => {
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
        await fetch(`http://192.168.0.17/api/cultivos/${id}`, {
            method: 'PUT', // PUT para actualización
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cultivoData),
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            errors: {},
            message: 'Error en la base de datos: Fallo al actualizar cultivo',
        };
    }
    revalidatePath('/dashboard/cultivos');
    redirect('/dashboard/cultivos');


};
