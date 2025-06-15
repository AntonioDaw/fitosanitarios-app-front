'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import LoginForm from './loginForm';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/dashboard',
    });

    if (res?.error) {
      console.log(res)
      setError('Credenciales inválidas');
    } else if (res?.ok && res.url) {
      window.location.href = res.url;
    }
  }

return <LoginForm onSubmit={handleSubmit} error={error} />;
}