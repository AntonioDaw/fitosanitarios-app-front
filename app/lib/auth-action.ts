
'use server';

import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';

export async function authenticate(prevState: string | undefined, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,  // no redirige automáticamente, lo haces tú con redirect()
      callbackUrl: '/dashboard',
    });

    if (res?.ok) {
      redirect('/dashboard'); // redirige desde server
    } else {
      return 'Credenciales inválidas.';
    }
  } catch (error) {
    throw error;
  }
}
