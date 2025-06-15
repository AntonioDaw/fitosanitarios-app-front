import { z } from 'zod';

export const adquisicionSchema = z.object({
  producto_id: z
    .number({ invalid_type_error: 'El producto es obligatorio.' })
    .int('ID de producto inválido')
    .positive('ID de producto inválido'),

  proveedor_id: z
    .number({ invalid_type_error: 'El proveedor es obligatorio.' })
    .int('ID de proveedor inválido')
    .positive('ID de proveedor inválido'),

  cantidad: z
    .number({ invalid_type_error: 'La cantidad es obligatoria.' })
    .int('La cantidad debe ser un número entero.')
    .positive('La cantidad debe ser mayor que cero.'),
});

