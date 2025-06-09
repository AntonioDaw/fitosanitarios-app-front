import { z } from 'zod';

export const getTratamientoSchema = ({
  tipoIds,
  cultivoIds,
  productoIds,
}: {
  tipoIds: number[];
  cultivoIds: number[];
  productoIds: number[];
}) => z.object({
  descripcion: z.string().min(1, 'La descripción es obligatoria'),
  tipo: z.coerce.number().refine((id) => tipoIds.includes(id), {
    message: 'El tipo seleccionado no es válido',
  }),
  cultivos: z
    .array(z.coerce.number().refine((id) => cultivoIds.includes(id)))
    .min(1, 'Debe seleccionar al menos un cultivo'),
  productos: z
    .array(
      z.object({
        id: z.coerce.number().refine((id) => productoIds.includes(id)),
        cantidad_por_100_litros: z
          .string()
          .regex(/^\d+(\.\d{1,2})?$/, 'Cantidad inválida'),
      })
    )
    .min(1, 'Debe añadir al menos un producto'),
});
