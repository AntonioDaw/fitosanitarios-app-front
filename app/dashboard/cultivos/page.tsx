'use client';

import React from 'react';
import { fetchTableCultivo } from '@/app/lib/api';
import PaginatedTable from '@/app/components/PaginatedTable';
import { usePaginateFetch } from '@/app/hooks/usePaginateFetch';

type Cultivo = {
  id: number;
  nombre: string;
  icono_url: string;
  tipo: string;
  esta_plantado: boolean
};

export default function CultivosPage() {
  const {
    data,
    page,
    totalPages,
    setPage,
    query,
    setQuery,
    refetch
  } = usePaginateFetch<Cultivo>(fetchTableCultivo);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-50">
      <div className="w-full">
        <PaginatedTable
          data={data}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          query={query}
          setQuery={setQuery}
          onDelete={refetch}
        />
      </div>
    </div>
  );
}