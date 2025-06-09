'use client';

import Image from 'next/image';

import DeleteButton from '../DeleteButton';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';
import { Tratamiento } from '@/app/types';

interface TratamientoShowProps {
  tratamiento: Tratamiento;
  onDelete: (id: number) => void;
}

const getEstadoLabel = (estado: number) => {
  switch (estado) {
    case 0:
      return { text: 'Pendiente', color: 'border-yellow-500', badge: 'bg-yellow-600' };
    case 1:
      return { text: 'Activo', color: 'border-green-500', badge: 'bg-green-600' };
    case 2:
      return { text: 'Terminado', color: 'border-red-500', badge: 'bg-red-600' };
    default:
      return { text: 'Desconocido', color: 'border-gray-500', badge: 'bg-gray-500' };
  }
};

export default function TratamientoShow({ tratamiento, onDelete }: TratamientoShowProps) {
  const estado = getEstadoLabel(tratamiento.estado);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className={`border-4 ${estado.color} rounded-xl shadow-xl max-w-5xl mx-auto overflow-hidden`}>
        {/* Cabecera */}
        <div className="flex items-center justify-between bg-slate-800 px-6 py-4 text-white">
          <div className="flex items-center gap-4">
            <Image
              src={tratamiento.tipo.icono_url}
              alt={tratamiento.tipo.nombre}
              width={48}
              height={48}
              className="rounded bg-white p-1"
            />
            <h2 className="text-2xl font-bold">{tratamiento.tipo.nombre}</h2>
          </div>
          {tratamiento.estado == 0 && (
          <div className="mt-6 flex justify-around gap-4">
            {/* Botón Actualizar */}
            <Link
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-5 rounded transition"
              href={`cultivos/${tratamiento.id}/edit`}
            >
              <FaEdit className="w-5 h-5" />
            </Link>

            {/* Botón Eliminar */}
            <DeleteButton id={tratamiento.id} onDeleted={() => onDelete(tratamiento.id)}
              className="flex items-center gap-1 bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition hover:cursor-pointer" />
          </div>
          )}
        </div>

        {/* Cuerpo */}
        <div className="bg-white text-gray-800 px-6 py-6">
          {/* Descripción */}
          <p className="mb-6 text-lg">
            <span className="font-semibold">Descripción:</span> {tratamiento.descripcion}
          </p>

          {/* Cultivos */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-1">Cultivos</h3>
            <ul className="list-disc ml-6 text-gray-700">
              {tratamiento.cultivos.map((cultivo) => (
                <li key={cultivo.id}>{cultivo.nombre}</li>
              ))}
            </ul>
          </div>

          {/* Productos */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-1">Productos aplicados</h3>
            <ul className="list-disc ml-6 text-gray-700">
              {tratamiento.productos.map((producto) => (
                <li key={producto.id}>
                  {producto.nombre} – {producto.cantidad_por_100_litros} L / 100L
                </li>
              ))}
            </ul>
          </div>

          {/* Fecha y estado */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">
            <p className="text-sm text-gray-500">
              <strong>Fecha de creación:</strong> {new Date(tratamiento.created_at).toLocaleString()}
            </p>
            <span
              className={`inline-block px-4 py-1 rounded-full font-medium text-sm text-white ${estado.badge}`}
            >
              Estado: {estado.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

