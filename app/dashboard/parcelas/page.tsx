'use client';

import React from 'react';
import { usePaginateFetch } from '@/app/hooks/usePaginateFetch'; 
import { fetchTableParcela } from '@/app/lib/parcelas/table';
import PaginatedTable from '@/app/components/parcelas/PaginatedTable';
import { Parcela } from '@/app/types';



export default function ParcelasPage() {
  const {
    data,
    page,
    totalPages,
    setPage,
    query,
    setQuery,
    refetch
  } = usePaginateFetch<Parcela>(fetchTableParcela);

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