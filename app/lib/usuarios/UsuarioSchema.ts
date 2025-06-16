import { z } from 'zod';

export const usuarioSchema = z.object({
  name: z.string()
    .nonempty('El nombre de usuario es obligatorio.')
    .max(255, 'El nombre es demasiado largo (máximo 255 caracteres).')
    .regex(/^[0-9a-zA-ZÀ-ÿ\s.,'()-]+$/, 'El nombre solo puede contener letras, números, espacios y caracteres básicos (.,\'()-).'),

  email: z.string()
    .nonempty('El email es obligatorio.')
    .max(50, 'El email es demasiado largo (máximo 50 caracteres).')
    .email('El email debe tener un formato válido.'),

  role: z.enum(['admin', 'user'], {
    errorMap: () => ({ message: 'El rol debe ser uno válido: admin, user' }),
  }),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres.')
    .max(100, 'La contraseña es demasiado larga (máximo 100 caracteres).')
    .optional()
});

