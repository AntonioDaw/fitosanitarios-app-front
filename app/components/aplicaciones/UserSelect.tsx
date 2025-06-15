type Props = {
  user: { id: number; role: string }; // Usuario logueado
  state?: {
    success?: boolean;
    errors?: { user_id?: string[] };
  };
};

export default function UsuarioField({ user, state }: Props) {
  const isAdmin = user.role === 'admin';

  if (isAdmin) {
    return (
      <div>
        <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 mb-1">
          Usuario:
        </label>
        <select
          id="usuario"
          name="usuario"
          className="mt-1 block w-full px-4 py-2 border rounded"
          required
        >
          <option value="1">Perito</option>
          <option value="2">Aplicador</option>
        </select>
        {state?.success === false && state.errors?.user_id && (
          <p className="text-red-600 mt-1 text-sm">{state.errors.user_id.join(', ')}</p>
        )}
      </div>
    );
  }

  // No admin: campo hidden con id del usuario logueado
  return (
    <input type="hidden" name="usuario" value={user.id} />
  );
}
