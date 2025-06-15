'use client';

import React from 'react';

import PaginatedTable from '@/app/components/productos/PaginatedTable';
import { usePaginateFetch } from '@/app/hooks/usePaginateFetch';
import { Producto } from '@/app/types';
import {fetchTableProducto } from '@/app/lib/productos/table';



export default function ProductosPage() {
  const {
    data,
    page,
    totalPages,
    setPage,
    query,
    setQuery,
    refetch
  } = usePaginateFetch<Producto>(fetchTableProducto);

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