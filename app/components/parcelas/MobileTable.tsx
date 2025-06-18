
import React from 'react'
import SearchInput from '../SearchInput'
import Link from 'next/link'
import { FaEdit, FaPlus } from 'react-icons/fa'
import DeleteButton from '../DeleteButton'
import { Parcela } from '@/app/types'



type Props = {
  data: Parcela[]
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  query: string
  setQuery: (value: string) => void
  onCreate?: () => void
  perPage?: number
  onDelete?: () => void;
}


export default function MobileTable({
  data,
  page,
  totalPages,
  onPageChange,
  query,
  setQuery,
  onDelete
}: Props) {
  return (

    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="..."
        />
        <Link
          href="/dashboard/parcelas/create"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition"
        >
          <FaPlus className="w-4 h-4 text-white" />
          Crear
        </Link>
      </div>
      {data.length > 0 ? (
        data.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-slate-700 p-1 shadow-md"
          >
            <div className="bg-white rounded-xl p-4 flex items-center gap-4 justify-between">
              {/* Icono + info */}
              <div className="flex flex-col items-start gap-2">
                <p className="text-base font-semibold text-gray-800 text-center">
                  Nombre:{item.nombre}
                </p>
                <p className="text-base font-semibold text-gray-800 text-center">
                  {item.n_sectores} sectores
                </p>
              </div>

              {/* Botones de acción */}
              <div className="mt-6 flex justify-center align-middle gap-4">
                <Link
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 px-4 rounded transition"
                  href={`dashboard/parcelas/${item.id}/edit`}
                >
                  <FaEdit className="w-5 h-5" />
                </Link>

                <DeleteButton id={Number(item.id)} onDeleted={onDelete} tipo={"Parcela"} />

              </div>
            </div>

          </div>
        ))
      ) : (
        <p className="text-center text-gray-400 italic">No hay datos</p>
      )}

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => onPageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Anterior
        </button>
        <span className="text-sm text-white font-medium">
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => onPageChange(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}
