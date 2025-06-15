'use client';

import DeleteButton from '../DeleteButton';
import Link from 'next/link';
import { FaEdit, FaEye, FaSeedling, FaBan } from 'react-icons/fa'; // Importamos FaEye, FaSeedling y FaBan
import { LandPlot } from 'lucide-react'; // Importamos LandPlot de Lucide React
import { Parcela } from '@/app/types';


interface ParcelaShowProps {
    parcela: Parcela;
    onDelete: (id: number) => void;
}

// Función auxiliar para obtener el texto y estilo del badge de "plantado"
const getPlantadoLabel = (plantado: boolean) => {
    switch (plantado) {
        case false:
            return { text: 'Vacío', badge: 'bg-red-600' };
        case true:
            return { text: 'Plantado', badge: 'bg-green-600' };
        default:
            // Caso por defecto para evitar errores si 'plantado' no es boolean
            return { text: 'Desconocido', badge: 'bg-gray-500' };
    }
};

export default function ParcelaShow({ parcela, onDelete }: ParcelaShowProps) {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
            <div className="border-4 border-slate-200 rounded-xl shadow-2xl max-w-5xl mx-auto overflow-hidden bg-white">
                {/* Cabecera */}
                <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-slate-700 to-slate-900 px-6 py-4 text-white gap-4 sm:gap-0">
                    <div className="flex items-center gap-4">
                        <LandPlot className="w-8 h-8 text-yellow-400" /> {/* Icono de Lucide para Parcela */}
                        <h2 className="text-3xl font-extrabold tracking-tight">{parcela.nombre}</h2>
                    </div>

                    <div className="flex gap-3">
                        {/* Botón Actualizar */}
                        <Link
                            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition transform hover:scale-105"
                            href={`edit`}
                        >
                            <FaEdit className="w-5 h-5" />
                        </Link>

                        {/* Botón Eliminar */}
                        <DeleteButton id={Number(parcela.id)} onDeleted={() => onDelete(Number(parcela.id))}
                            className="flex items-center gap-1 bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition hover:cursor-pointer" />
                    </div>
                </div>
            </div>

            {/* Cuerpo */}
            <div className="p-6 sm:p-8 space-y-6">
                {/* Número de Parcela (si existe y es relevante) */}
                <p className="text-lg">
                    <span className="font-semibold text-gray-700">Número de Parcela:</span> {parcela.numero_parcela}
                </p>

                {/* Contenedor de Sectores */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <FaEye className="w-6 h-6 text-blue-500" /> {/* Icono de "Ver" para Sectores */}
                        Sectores ({parcela.sectors.length} {parcela.sectors.length === 1 ? 'Sector' : 'Sectores'})
                    </h3>
                    {parcela.sectors && parcela.sectors.length > 0 ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {parcela.sectors.map((sector) => {
                                const { text, badge } = getPlantadoLabel(sector.esta_plantado);
                                return (
                                    <li
                                        key={sector.id}
                                        className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm border border-gray-200 hover:shadow-md transition"
                                    >
                                        <span className="text-lg font-medium text-gray-700 flex items-center gap-2">
                                            Sector {sector.numero_sector}
                                        </span>

                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${badge}`}>
                                            {sector.esta_plantado ? (
                                                <FaSeedling className="inline-block mr-1" />
                                            ) : (
                                                <FaBan className="inline-block mr-1" />
                                            )}
                                            {text}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className="text-gray-600 text-center py-4">No hay sectores asociados a esta parcela.</p>
                    )}
                </div>
            </div>
        </div>
    );
}