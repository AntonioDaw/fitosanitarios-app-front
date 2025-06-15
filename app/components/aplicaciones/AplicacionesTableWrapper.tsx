'use client';

import { useEffect, useState } from 'react';
import { fetchAplicaciones} from '@/app/lib/data';
import AplicacionesTable from './AplicacionesTable';
import { Aplicacion } from '@/app/types';


export default function AplicacionesTableWrapper({ reload }: { reload: boolean }) {
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [aplicacionesData, setAplicacionesData] = useState<Aplicacion[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const unidadRes = await fetchAplicaciones(currentPage, itemsPerPage);
        setAplicacionesData(unidadRes.data);
        setTotalPages(unidadRes.totalPages);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Error al cargar los datos de aplicaciones.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [currentPage,reload]);

  if (loading) return loading
  if (error) return <p className="text-center text-red-600 py-4">{error}</p>;

  return (
    <AplicacionesTable
      currentPage={currentPage}
      data={aplicacionesData}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}