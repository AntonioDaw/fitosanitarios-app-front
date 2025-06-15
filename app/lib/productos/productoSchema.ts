import { z } from 'zod'

export const productoSchema = z.object({
  nombre: z.string()
    .nonempty('El nombre es obligatorio.')
    .max(255, 'El nombre es demasiado largo (máx 255).')
    .regex(/^[0-9a-zA-ZÀ-ÿ\s]+$/, 'El nombre solo puede contener letras y espacios.'),

  sustancia_activa: z.string()
    .nonempty('La sustancia activa es obligatoria.')
    .max(255, 'La sustancia activa es demasiado larga (máx 255).')
    .regex(/^[a-zA-Z0-9À-ÿ\s,.\-]+$/, 'La sustancia activa solo puede contener letras, números, espacios, coma, punto o guion.'),

 presentacion: z.preprocess(
  (val) => val === '' ? undefined : val,
  z.enum(['polvo', 'grano', 'liquido'], {
    errorMap: () => ({ message: 'La presentación debe ser: polvo, grano o líquido.' })
  })
),

  uso: z.string({
  required_error: 'El uso es obligatorio.'
})
  .min(1, 'El uso es obligatorio.')
  .max(1000, 'El uso es demasiado largo (máx 1000).'),

  precio: z.preprocess(
    (val) => typeof val === 'string' ? parseFloat(val) : val,
    z.number({ invalid_type_error: 'El precio debe ser un número.' })
      .min(0, 'El precio debe ser cero o mayor.')
  ),
})