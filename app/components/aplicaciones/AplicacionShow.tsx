'use client';

import { LandPlot } from 'lucide-react';
import { Aplicacion } from '@/app/types';
import AccionesAplicacion from '../EstadoButtons';
import { FaEye, FaFlask, FaHourglass } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

interface AplicacionShowProps {
    aplicacion: Aplicacion;
}



export default function AplicacionShow({ aplicacion }: AplicacionShowProps) {
      
      const { data: session } = useSession();
      const role = session?.user?.role;
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
            <div className="border-4 border-slate-200 rounded-xl shadow-2xl max-w-5xl mx-auto overflow-hidden bg-white">
                {/* Cabecera */}
                <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-slate-700 to-slate-900 px-6 py-4 text-white gap-4 sm:gap-0">
                    <div className="flex items-center gap-4">
                        <LandPlot className="w-8 h-8 text-yellow-400" />
                        <h2 className="text-3xl font-extrabold tracking-tight">
                            Tratamiento: {aplicacion.tratamiento?.descripcion || 'sin descripción'}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Cuerpo */}
            <div className="p-6 sm:p-8 space-y-6">
                {/* Sectores */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <FaEye className="w-6 h-6 text-blue-500" />
                        Sectores tratados ({aplicacion.sectores.length})
                    </h3>
                    {aplicacion.sectores.length > 0 ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {aplicacion.sectores.map((sector) => {

                                return (
                                    <li
                                        key={sector.id}
                                        className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-sm border border-gray-200 hover:shadow-md transition"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-medium text-gray-700">
                                                Sector {sector.numero_sector} Parcela {sector.parcela_nombre}
                                            </span>
                                        </div>
                                        {sector.litros_aplicados && (
                                            <p className="text-sm text-gray-600">
                                                Litros aplicados: <span className="font-semibold">{sector.litros_aplicados}</span>
                                            </p>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className="text-gray-600 text-center py-4">No hay sectores asociados a esta aplicación.</p>
                    )}
                </div>

                {/* Productos */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <FaFlask className="w-6 h-6 text-green-600" />
                        Productos utilizados ({aplicacion.gasto_por_producto.length})
                    </h3>
                    {aplicacion.gasto_por_producto.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {aplicacion.gasto_por_producto.map((producto) => (
                                <li key={producto.producto_id} className="py-2 flex justify-between items-center">
                                    <span className="text-gray-700">{producto.nombre}</span>
                                    {producto.cantidad && (
                                        <span className="text-sm text-gray-600">
                                            {producto.cantidad}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600 text-center py-4">No hay productos registrados.</p>
                    )}
                </div>
                <div className="border-4 border-slate-200 rounded-xl shadow-2xl max-w-5xl mx-auto overflow-hidden bg-white">
                    {/* Cabecera */}
                    <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-slate-700 to-slate-900 px-6 py-4 text-white gap-4 sm:gap-0">
                        <div className="flex items-center gap-4">
                            <FaHourglass className="w-8 h-8 text-yellow-400" />
                            <h2 className="text-3xl font-extrabold tracking-tight">
                                Estado: {aplicacion.estado || 'sin estado'}
                            </h2>
                        </div>
                        {
                            
                        }
                        
                        {aplicacion.estado === "provisional" && role==='admin' &&
                            <AccionesAplicacion id={aplicacion.id} />
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}
