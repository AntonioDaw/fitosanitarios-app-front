'use client'

import Link from 'next/link'
import DeleteButton from '../DeleteButton'
import { FaEye } from 'react-icons/fa'
import { User } from '@/app/types'
import { useSession } from 'next-auth/react'



type Props = {
    data: User[]
    page: number
    totalPages: number
    onPageChange: (page: number) => void
    query: string
    setQuery: (value: string) => void
    onCreate?: () => void
    perPage?: number
    onDelete?: () => void;
}

export default function DeskTable({
    data,
    page,
    totalPages,
    onPageChange,
    perPage = 10,
    onDelete,
}: Props) {
    const emptyRows = perPage - data.length > 0 ? perPage - data.length : 0
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const isCurrentUser = (id: number | string) => Number(id) === Number(userId);

    return (

        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
                <Link
                    href={`/dashboard/usuarios/create`}
                    className="px-5 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                    Crear
                </Link>
            </div>
            <div className="gap-6 items-stretch">
                <div className="md:col-span-2 bg-slate-700 rounded-lg shadow-lg p-4 h-full flex flex-col">
                    {/* Tabla */}
                    <div className="overflow-x-auto flex-grow">
                        <table className="min-w-full bg-white text-sm">
                            <thead className="bg-slate-700">
                                <tr>

                                    <th className="px-6 py-3 text-center font-semibold text-white">Nombre</th>
                                    <th className="px-6 py-3 text-center font-semibold text-white">Correo electrónico</th>
                                    <th className="px-6 py-3 text-center font-semibold text-white">Rol</th>
                                    <th className="px-6 py-3 text-center font-semibold text-white">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? (
                                    data.map((item) => (
                                        <tr
                                            key={item.id}


                                        >
                                            <td className="px-6 py-3 text-center text-gray-800">{item.name}</td>
                                            <td className="px-6 py-3 text-center text-gray-800">{item.email}</td>
                                            <td className="px-6 py-3 text-center text-gray-600">{item.role}</td>
                                            <td className="px-6 py-3 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <Link
                                                        href={`/dashboard/usuarios/${item.id}/mostrar`}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-5 rounded transition"
                                                    >
                                                        <FaEye className="w-5 h-5" />
                                                    </Link>
                                                    {!isCurrentUser(item.id) && (
                                                        <DeleteButton id={Number(item.id)} onDeleted={onDelete} tipo="Usuario" />
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="text-center py-6 text-gray-400 italic">
                                            No hay datos
                                        </td>
                                    </tr>
                                )}

                                {Array.from({ length: emptyRows }).map((_, i) => (
                                    <tr key={`empty-${i}`} className="opacity-0">
                                        <td className="px-3 py-2">&nbsp;</td>
                                        <td className="px-6 py-3">&nbsp;</td>
                                        <td className="px-6 py-3">&nbsp;</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Paginación */}
                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={() => onPageChange(Math.max(page - 1, 1))}
                            disabled={page === 1}
                            className="px-5 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            Anterior
                        </button>
                        <span className="text-white font-semibold">
                            Página {page} de {totalPages}
                        </span>
                        <button
                            onClick={() => onPageChange(Math.min(page + 1, totalPages))}
                            disabled={page === totalPages}
                            className="px-5 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}