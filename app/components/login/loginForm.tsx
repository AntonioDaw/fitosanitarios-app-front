import React from 'react';

interface LoginFormProps {
  error: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function LoginForm({ error, onSubmit }: LoginFormProps) {
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Iniciar sesión</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="ejemplo@dominio.com"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none rounded-md text-white font-semibold transition"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}


