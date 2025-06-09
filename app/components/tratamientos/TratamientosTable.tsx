'use client'

import React, { useState } from 'react';
import useSWR from 'swr';
import { Tratamiento } from '@/app/types';
import Link from 'next/link';
import { cambiarEstado, fetchTratamientosTipo } from '@/app/lib/api';


interface TratamientosListProps {
    initialData: Tratamiento[];
    tipoId: number
}

const getEstadoLabel = (estado: number) => {
    switch (estado) {
        case 0:
            return { text: 'Pendiente', color: 'bg-yellow-600' };
        case 1:
            return { text: 'Activo', color: 'bg-green-600' };
        case 2:
            return { text: 'Terminado', color: 'bg-red-600' };
        default:
            return { text: 'Desconocido', color: 'bg-gray-500' };
    }
};

const TratamientosList: React.FC<TratamientosListProps> = ({ initialData, tipoId}) => {
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
                await mutate();
                closeModal();
            } catch (e) {
                console.error("Error al cambiar estado:", e);
            }
        }
    };

    if (isLoading || !tratamientos) return <p>Cargando tratamientos...</p>;
    if (tratamientos.length === 0) return <p>No hay tratamientos para mostrar.</p>;

    return (

        <div className="flex flex-col gap-4 relative">
            {tratamientos.map((tratamiento) => {
                const estado = getEstadoLabel(tratamiento.estado);
                const estadoFinalizado = tratamiento.estado === 2;

                return (
                    <div key={tratamiento.id} className="bg-slate-700 rounded-lg shadow-lg p-3 text-white h-100 flex flex-col justify-between">
                        <div className="bg-white shadow rounded-xl p-4 border border-slate-700 w-full h-full flex flex-col justify-between">
                            <Link
                                href={`tratamientos/${tratamiento.id}/mostrar`}
                                className="text-lg bg-slate-400 shadow rounded-xl p-2 font-semibold text-white mb-2 transition-transform transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                            >
                                <h3 >{tratamiento.descripcion}</h3>
                            </Link>

                            <div className="mb-2">
                                <span className="text-sm font-medium text-gray-600">Tipo:</span>{' '}
                                <span className="text-sm text-gray-800">{tratamiento.tipo?.nombre}</span>
                            </div>

                            <div className="mb-2">
                                <span className="text-sm font-medium text-gray-600">Cultivos:</span>{' '}
                                <span className="text-sm text-gray-800">{tratamiento.cultivos.map((c) => c.nombre).join(', ')}</span>
                            </div>

                            <div className="mb-2">
                                <span className="text-sm font-medium text-gray-600">Productos:</span>
                                <ul className="list-disc ml-6 mt-1 text-sm text-gray-800">
                                    {tratamiento.productos.map((producto) => (
                                        <li key={producto.id}>
                                            {producto.nombre} – {producto.cantidad_por_100_litros} L / 100L
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button onClick={estadoFinalizado ? undefined : () => openModal(tratamiento.id)}>
                                <div className={`text-sm rounded-lg p-1 font-semibold ${estado.color} relative group w-full h-fit shadow-lg ${!estadoFinalizado && 'transition-transform transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 cursor-pointer'} `}>

                                    <span className="text-sm font-medium text-white">Estado:</span> <span>{estado.text}</span> <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">{!estadoFinalizado && 'Pulsa para cambiar'}</span>

                                </div>
                            </button>
                        </div>
                    </div>
                );
            })}

            {/* Modal */}
            {modalVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-slate-700 text-white rounded-lg p-6 max-w-sm w-full shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Confirmar cambio</h2>
                        <p className="mb-6">¿Estás seguro que quieres cambiar el estado del tratamiento: <strong>{tratamientos.find(t => t.id === selectedTratamientoId)?.descripcion}</strong>?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 rounded bg-gray-400 hover:bg-gray-600 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmChange}
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TratamientosList;




