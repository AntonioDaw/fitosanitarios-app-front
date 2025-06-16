'use client';

import React from 'react';
import { usePaginateFetch } from '@/app/hooks/usePaginateFetch'; 


import {User } from '@/app/types';
import { fetchTableUsers} from '@/app/lib/api';
import PaginatedTable from '@/app/components/usuarios/PaginatedTable';



export default function ParcelasPage() {
  const {
    data,
    page,
    totalPages,
    setPage,
    query,
    setQuery,
    refetch
  } = usePaginateFetch<User>(fetchTableUsers);

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