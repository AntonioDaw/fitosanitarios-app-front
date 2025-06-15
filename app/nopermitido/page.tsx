import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - No autorizado</h1>
      <p className="text-lg mb-6">No tienes permiso para acceder a esta página.</p>

      <Link
        href="/dashboard"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Volver al Dashboard
      </Link>
    </div>
  );
}
