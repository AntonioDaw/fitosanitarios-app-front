'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { Tratamiento } from '@/app/types'; // Asegúrate de que Tratamiento y sus sub-interfaces estén bien definidas aquí
import Link from 'next/link';
import { cambiarEstado, fetchTratamientosTipo } from '@/app/lib/api';
import ConfirmModal from '../ConfirmarModal';
import { FaLeaf, FaBoxOpen, FaClock, FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa'; // Nuevos iconos para la lista

interface TratamientosListProps {
    initialData: Tratamiento[];
    tipoId: number;
}




const getEstadoLabel = (estado: number) => {
    switch (estado) {
        case 0:
            return { text: 'Pendiente', color: 'bg-yellow-600', icon: <FaClock className="inline-block mr-1" /> };
        case 1:
            return { text: 'Activo', color: 'bg-green-600', icon: <FaCheckCircle className="inline-block mr-1" /> };
        case 2:
            return { text: 'Terminado', color: 'bg-red-600', icon: <FaTimesCircle className="inline-block mr-1" /> };
        default:
            return { text: 'Desconocido', color: 'bg-gray-500', icon: null };
    }
};

const TratamientosList: React.FC<TratamientosListProps> = ({ initialData, tipoId }) => {
    const { data: tratamientos, mutate, isLoading } = useSWR<Tratamiento[]>(
        () => tipoId ? `tratamientos-tipo-${tipoId}` : null,
        () => fetchTratamientosTipo(tipoId),
        {
            fallbackData: initialData,
            revalidateOnMount: true,
        }
    );

    // Estado para modal
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTratamientoId, setSelectedTratamientoId] = useState<number | null>(null);

    const openModal = (id: number) => {
        setSelectedTratamientoId(id);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedTratamientoId(null);
        setModalVisible(false);
    };

    const handleConfirmChange = async () => {
        if (selectedTratamientoId !== null) {
            try {
                await cambiarEstado(selectedTratamientoId);
                await mutate(); // Revalida los datos para reflejar el cambio
                closeModal();
            } catch (e) {
                console.error("Error al cambiar estado:", e);
                // Aquí podrías mostrar una notificación al usuario de que hubo un error
            }
        }
    };

    if (isLoading || !tratamientos) return <p className="text-center text-gray-700 py-8">Cargando tratamientos...</p>;
    if (tratamientos.length === 0) return <p className="text-center text-gray-700 py-8">No hay tratamientos para mostrar.</p>;

    return (
        <div className="flex flex-col justify-between gap-6 p-4">
            {tratamientos.map((tratamiento) => {
                const estado = getEstadoLabel(tratamiento.estado);
                const estadoFinalizado = tratamiento.estado === 2;

                return (
                    <div
                        key={tratamiento.id}
                        className="w-full bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl min-h-[24rem]"
                    >
                        {/* Enlace clickable para ver detalles del tratamiento */}
                        <Link
                            href={`tratamientos/${tratamiento.id}/mostrar`}
                            className="block p-4 sm:p-6 bg-gradient-to-r from-slate-600 to-slate-800 text-white rounded-t-xl cursor-pointer"
                        >
                            <h3 className="text-xl sm:text-2xl font-bold mb-2 leading-tight">
                                <FaEye className="inline-block mr-2 text-blue-200" />
                                {tratamiento.descripcion || 'Sin descripción'}
                            </h3>
                            <p className="text-sm text-blue-200">
                                Tipo: {tratamiento.tipo?.nombre || 'Desconocido'}
                            </p>
                        </Link>

                        {/* Contenido de los detalles del tratamiento */}
                        <div className="flex-grow p-4 sm:p-6 space-y-4 text-gray-800">
                            <div>
                                <h4 className="text-base font-semibold mb-1 flex items-center gap-2 text-gray-700">
                                    <FaLeaf className="text-green-600" /> Cultivos:
                                </h4>
                                <p className="text-sm text-gray-600">
                                    {tratamiento.cultivos && tratamiento.cultivos.length > 0
                                        ? tratamiento.cultivos.map((c) => c.nombre).join(', ')
                                        : 'N/A'}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-base font-semibold mb-1 flex items-center gap-2 text-gray-700">
                                    <FaBoxOpen className="text-orange-600" /> Productos:
                                </h4>
                                {tratamiento.productos && tratamiento.productos.length > 0 ? (
                                    <ul className="list-disc ml-6 text-sm text-gray-600">
                                        {tratamiento.productos.map((producto) => (
                                            <li key={producto.id}>
                                                <span className="font-medium">{producto.nombre} – {producto.cantidad_por_100_litros} L/100L</span> <span>Quedan {producto.unidad_productos.length} unidades </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-600">N/A</p>
                                )}
                            </div>
                        </div>

                        {/* Botón de estado en la parte inferior de la tarjeta */}
                        <div className="p-4 sm:p-6 pt-0">
                            <button
                                onClick={estadoFinalizado ? undefined : () => openModal(tratamiento.id)}
                                className={`
                                    w-full py-2 px-4 rounded-lg font-bold text-base text-white shadow-lg transition-all duration-300
                                    ${estado.color}
                                    ${!estadoFinalizado ? 'hover:brightness-110 hover:-translate-y-0.5 cursor-pointer' : 'opacity-80 cursor-default'}
                                `}
                                disabled={estadoFinalizado}
                            >
                                <span className="flex items-center justify-center">
                                    {estado.icon} Estado: {estado.text}
                                    {!estadoFinalizado && (
                                        <span className="ml-2 text-xs opacity-80 group-hover:opacity-100 transition-opacity">
                                            (Pulsa para cambiar)
                                        </span>
                                    )}
                                </span>
                            </button>
                        </div>
                    </div>
                );
            })}

            <ConfirmModal
                visible={modalVisible}
                title="Confirmar cambio de estado"
                message={`¿Estás seguro que quieres cambiar el estado del tratamiento: ${tratamientos.find(t => t.id === selectedTratamientoId)?.descripcion || '...'}`}
                onConfirm={handleConfirmChange}
                onCancel={closeModal}
            />
        </div>
    );
};

export default TratamientosList;

