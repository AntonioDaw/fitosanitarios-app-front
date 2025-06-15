import { } from "@/app/lib/data";
import { Aplicacion } from "@/app/types";
import Link from "next/link";

import { FaEye, FaSprayCan } from "react-icons/fa";


function AplicacionesTable({ data, totalPages, currentPage, onPageChange }: { data: Aplicacion[], totalPages: number, currentPage: number, onPageChange: (page: number) => void }) {
    return (
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                <FaSprayCan className="text-green-600" /> Aplicaciones
            </h3>
            {data.length === 0 ? (
                <p className="text-center text-gray-600 py-8">Sin datos de aplicaciones.</p>
            ) : (
                <>
                    <div className="overflow-x-auto rounded-md shadow-sm border border-gray-100 h-125">
                        <table className="min-w-full text-gray-700 bg-white">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-tl-md">
                                        Tratamiento
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Usuario
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Cantidad
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-tr-md">
                                        Fecha
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">

                                {data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.tratamiento.descripcion || 'N/A'}</td>
                                        <td className="px-4 py-3 text-sm">{item.user.nombre}</td>
                                        <td className="px-4 py-3 text-sm">{item.litros}</td>
                                        <td className="px-4 py-3 text-sm">{new Date(item.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-3 text-center">

                                            <Link
                                                href={`/dashboard/aplicaciones/${item.id}/mostrar`}
                                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium p-2 rounded transition flex items-center w-10 h-10"
                                            >
                                                <FaEye className="w-5 h-5" />
                                            </Link>


                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                    {/* Componente de Paginación */}
                    <div className="flex justify-center mt-6 gap-2">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => onPageChange(index + 1)}
                                className={`px-4 py-2 rounded-lg font-medium text-sm transition ${currentPage === index + 1
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
export default AplicacionesTable;