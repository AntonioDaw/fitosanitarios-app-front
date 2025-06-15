import { z } from 'zod';

export const parcelaUpdateSchema = z.object({

    nombre: z.string()
        .nonempty('El nombre de la parcela es obligatorio.')
        .max(255, 'El nombre es demasiado largo (máximo 255 caracteres).')
        .regex(/^[0-9a-zA-ZÀ-ÿ\s.,'()-]+$/, 'El nombre solo puede contener letras, números, espacios y caracteres básicos (.,\'()-).')
        ,


    numero_parcela: z.string()
        .nonempty('El número de parcela es obligatorio.')
        .max(50, 'El número de parcela es demasiado largo (máximo 50 caracteres).')
        .regex(/^[0-9a-zA-Z\s.-]+$/, 'El número de parcela solo puede contener letras, números, espacios, puntos o guiones.'),

    area: z.number({
        invalid_type_error: 'El área debe ser numérica.',
        required_error: 'El área es obligatoria.',
    })
        .min(0, 'El área no puede ser negativa.'),
});
