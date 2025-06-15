'use client';

import Image from 'next/image';

import DeleteButton from '../DeleteButton';
import Link from 'next/link';
import { FaEdit,FaSeedling, FaBoxOpen } from 'react-icons/fa';
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
      <div className={`border-4 ${estado.color} rounded-xl shadow-2xl max-w-5xl mx-auto overflow-hidden bg-white`}>
        {/* Cabecera */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-slate-700 to-slate-900 px-6 py-4 text-white gap-4 sm:gap-0">
          <div className="flex items-center gap-4">
            {/* Imagen del icono del tipo de tratamiento */}
            <Image
              src={tratamiento.tipo.icono_url}
              alt={tratamiento.tipo.nombre}
              width={48}
              height={48}
              className="rounded-full bg-white p-1 shadow-md" // Estilo mejorado para el icono
            />
            <h2 className="text-3xl font-extrabold tracking-tight">{tratamiento.tipo.nombre}</h2>
          </div>
          {tratamiento.estado == 0 && (
            <div className="flex gap-3">
              {/* Botón Actualizar */}
              <Link
                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded transition hover:cursor-pointer"
                href={`edit`}
              >
                <FaEdit className="w-5 h-5" />
              </Link>

              {/* Botón Eliminar */}
              <DeleteButton id={Number(tratamiento.id)} onDeleted={() => onDelete(Number(tratamiento.id))}
                className="flex items-center gap-1 bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition hover:cursor-pointer" />
            </div>
          )}
        </div>

        {/* Cuerpo */}
        <div className="bg-white text-gray-800 p-6 sm:p-8 space-y-6">
          {/* Descripción */}
          <p className="text-lg text-gray-700 leading-relaxed">
            <span className="font-semibold text-gray-800">Descripción:</span> {tratamiento.descripcion || 'No hay descripción disponible para este tratamiento.'}
          </p>

          {/* Contenedor de Cultivos */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaSeedling className="w-6 h-6 text-green-500" /> {/* Icono de "Semilla" para Cultivos */}
              Cultivos
            </h3>
            {tratamiento.cultivos && tratamiento.cultivos.length > 0 ? (
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                {tratamiento.cultivos.map((cultivo) => (
                  <li key={cultivo.id} className="text-lg">
                    {cultivo.nombre}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-center py-2">No hay cultivos asociados a este tratamiento.</p>
            )}
          </div>

          {/* Contenedor de Productos */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaBoxOpen className="w-6 h-6 text-orange-500" /> {/* Icono de "Caja Abierta" para Productos */}
              Productos aplicados
            </h3>
            {tratamiento.productos && tratamiento.productos.length > 0 ? (
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                {tratamiento.productos.map((producto) => (
                  <li key={producto.id} className="text-lg">
                    <span className="font-medium">{producto.nombre}</span> – {producto.cantidad_por_100_litros} L / 100L
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-center py-2">No hay productos aplicados en este tratamiento.</p>
            )}
          </div>

          {/* Fecha y estado */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <strong className="font-semibold text-gray-700">Fecha de creación:</strong> {new Date(tratamiento.created_at).toLocaleString()}
            </p>
            <span
              className={`inline-block px-4 py-1.5 rounded-full font-bold text-base text-white ${estado.badge} shadow-sm`}
            >
              Estado: {estado.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
