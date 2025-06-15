import { UnidadProducto } from "@/app/lib/data";
import { FaWarehouse } from "react-icons/fa";

function InventarioTable({ data, totalPages, currentPage, onPageChange}: { data: UnidadProducto[], totalPages: number, currentPage: number, onPageChange: (page: number) => void }) {
    return (
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                <FaWarehouse className="text-green-600" /> Inventario Actual
            </h3>
            {data.length === 0 ? (
                <p className="text-center text-gray-600 py-8">No hay unidades de producto en el inventario.</p>
            ) : (
                <>
                    <div className="overflow-x-auto rounded-md shadow-sm border border-gray-100 h-125">
                        <table className="min-w-full text-gray-700 bg-white">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-tl-md">
                                        Producto
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Codigo-interno
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Proveedor
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-tr-md">
                                        Fecha Adquisición
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">

                                {data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.producto.nombre || 'N/A'}</td>
                                        <td className="px-4 py-3 text-sm">{item.codigo_interno}</td>
                                        <td className="px-4 py-3 text-sm">{item.proveedor.nombre}</td>
                                        <td className="px-4 py-3 text-sm">{new Date(item.fecha_ingreso).toLocaleDateString()}</td>
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
export default InventarioTable;