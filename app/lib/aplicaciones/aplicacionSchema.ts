import { z } from 'zod';

export const AplicacionSchema = z.object({
    user_id: z.number({
        invalid_type_error: 'Usuario no válido',
        required_error: 'El usuario es requerido',
    })
        .int({ message: 'Usuario no válido' })
        .min(1, { message: 'Usuario no válido' })
        .refine(value => !Number.isNaN(value), {
            message: 'Usuario no válido',
        }),
    tratamiento_id: z.number().int().min(1, { message: 'Tratamiento no valido' }),
    litros: z.number().min(500, { message: 'La cantidad de litros debe ser al menos 500' }),
    sectors: z
        .array(
            z.object({
                id: z.number().int().min(1, { message: 'Sector no valido' }),
                litros_aplicados: z.number().min(100, { message: 'Los litros aplicados deben ser al menos 0.01' }),
            })
        )
        .min(1, { message: 'Debes seleccionar al menos un sector' }),
    unidad_productos: z
        .array(
            z.object({
                id: z.number().int().min(1, { message: 'Unidad de producto no permitida' }),
    estado: z.union([
        z.literal(1),
        z.literal(2)
    ], { invalid_type_error: 'Estado inválido' })
})
        )
        .min(1, { message: 'Debes incluir al menos una unidad de producto' }),
}).strict();


export type AplicacionInput = z.infer<typeof AplicacionSchema>;