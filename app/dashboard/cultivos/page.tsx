'use client';

import React from 'react';
import { fetchTableCultivo } from '@/app/lib/api';
import { usePaginateFetch } from '@/app/hooks/usePaginateFetch';
import PaginatedTableCultivo from '@/app/components/cultivos/PaginatedTable';
import { Cultivo } from '@/app/types';



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
        <PaginatedTableCultivo
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