'use client'
import React, { useState, useEffect } from 'react'
import TopBarDesk from '../TopBarDesk'
import Link from 'next/link'
import DeleteButton from '../DeleteButton'
import { FaEdit } from 'react-icons/fa'
import { Producto } from '@/app/types'



type Props = {
  data: Producto[]
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
  query,
  setQuery,
  perPage = 10,
  onDelete,
}: Props) {
  const emptyRows = perPage - data.length > 0 ? perPage - data.length : 0
  const [selected, setSelected] = useState<Producto | null>(null)

  useEffect(() => {
    if (data.length > 0) {
      setSelected(data[0])
    } else {
      setSelected(null)
    }
  }, [data])

  return (

    <div className="max-w-6xl mx-auto p-6">
      <TopBarDesk query={query} setQuery={setQuery} tipoBarra='producto' />
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {/* Card izquierda */}
        <div className="bg-slate-700 rounded-lg shadow-lg p-6 text-white h-full flex flex-col justify-between">
          {selected ? (
            <>
              <div className="flex flex-col items-center text-center">
                <div className="text-sm uppercase tracking-wide text-gray-300">{selected.estado}</div>
                <h3 className="text-2xl font-bold text-white">{selected.nombre}</h3>
              </div>


              <div className="bg-white text-gray-800 rounded-lg shadow-md p-4 mt-6 w-full">
                <p>
                  <span className="font-semibold">Creado:</span>{' '}
                  {new Date(selected.created_at).toLocaleDateString('es-ES')}
                </p>
                <p><span className="font-semibold">Presentación:</span> {selected.presentacion}</p>
                <p><span className="font-semibold">Sustancia activa:</span> {selected.sustancia_activa}</p>
                <p><span className="font-semibold">Precio:</span> {selected.precio} Euros</p>
              </div>

              <div className="mt-6 flex justify-around gap-4">
                <Link
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-5 rounded transition"
                  href={`productos/${selected.id}/edit`}
                >
                  <FaEdit className="w-5 h-5" />
                </Link>

                <DeleteButton id={selected.id} onDeleted={onDelete} tipo={"Producto"}/>
              </div>
            </>
          ) : (
            <div className="text-gray-300 italic text-center h-full flex items-center justify-center">
              Selecciona un Producto
            </div>
          )}
        </div>

        {/* Tabla derecha */}
        <div className="md:col-span-2 bg-slate-700 rounded-lg shadow-lg p-4 h-full flex flex-col">
          {/* Controles */}


          {/* Tabla */}
          <div className="overflow-x-auto flex-grow">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-center font-semibold text-white">Presentacion</th>
                  <th className="px-6 py-3 text-center font-semibold text-white">Nombre</th>
                  <th className="px-6 py-3 text-center font-semibold text-white">Sustancia activa</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelected(item)}
                      className={`hover:bg-gray-100 transition-colors duration-200 cursor-pointer ${selected?.id === item.id ? 'bg-gray-100' : ''
                        }`}
                    >
                      <td className="px-3 py-2">{item.presentacion}

                      </td>
                      <td className="px-6 py-3 text-center text-gray-800">{item.nombre}</td>
                      <td className="px-6 py-3 text-center text-gray-800">{item.sustancia_activa}</td>

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
