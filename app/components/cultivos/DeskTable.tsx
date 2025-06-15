'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import TopBarDesk from '../TopBarDesk'
import Link from 'next/link'
import DeleteButton from '../DeleteButton'
import { FaEdit } from 'react-icons/fa'

type Item = {
  id: number
  nombre: string
  icono_url: string
  tipo: string
  esta_plantado: boolean
}

type Props = {
  data: Item[]
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
  const [selected, setSelected] = useState<Item | null>(null)

  useEffect(() => {
    if (data.length > 0) {
      setSelected(data[0])
    } else {
      setSelected(null)
    }
  }, [data])

  return (

    <div className="max-w-6xl mx-auto p-6">
      <TopBarDesk query={query} setQuery={setQuery} tipoBarra='cultivo' />
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {/* Card izquierda */}
        <div className="bg-slate-700 rounded-lg shadow-lg p-6 text-white h-full flex flex-col justify-between">
          {selected ? (
            <>
              <div className="flex flex-col items-center text-center">
                <Image
                  src={selected.icono_url}
                  alt={selected.tipo}
                  width={96}
                  height={96}
                  className="rounded object-contain mb-4"
                />
                <h3 className="text-xl font-semibold">{selected.nombre}</h3>
                <p className="text-gray-300 mt-1">Tipo: {selected.tipo}</p>
              </div>

              <div className="mt-6 flex justify-around gap-4">
                {!selected.esta_plantado && (
                  <Link
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-5 rounded transition"
                    href={`cultivos/${selected.id}/edit`}
                  >
                    <FaEdit className="w-5 h-5" />
                  </Link>
                )}

                <DeleteButton id={selected.id} onDeleted={onDelete} tipo={"Cultivo"} />
              </div>
            </>
          ) : (
            <div className="text-gray-300 italic text-center h-full flex items-center justify-center">
              Selecciona un cultivo
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
                  <th className="w-12"></th>
                  <th className="px-6 py-3 text-center font-semibold text-white">Nombre</th>
                  <th className="px-6 py-3 text-center font-semibold text-white">Tipo</th>
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
                      <td className="px-3 py-2">
                        <Image
                          src={item.icono_url}
                          alt={item.tipo}
                          width={28}
                          height={28}
                          className="object-contain rounded"
                        />
                      </td>
                      <td className="px-6 py-3 text-center text-gray-800">{item.nombre}</td>
                      <td className="px-6 py-3 text-center text-gray-600">{item.tipo}</td>
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
