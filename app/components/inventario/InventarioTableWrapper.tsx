'use client';

import { useEffect, useState } from 'react';
import { fetchUnidadProductos, UnidadProducto } from '@/app/lib/data';
import InventarioTable from './InventarioTable';

export default function InventarioTableWrapper({ reload }: { reload: boolean }) {
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1); // Estado interno
  const [inventarioData, setInventarioData] = useState<UnidadProducto[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const unidadRes = await fetchUnidadProductos(currentPage, itemsPerPage);
        setInventarioData(unidadRes.data);
        setTotalPages(unidadRes.totalPages);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Error al cargar los datos del inventario.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [currentPage,reload]);

  if (loading) return loading
  if (error) return <p className="text-center text-red-600 py-4">{error}</p>;

  return (
    <InventarioTable
      currentPage={currentPage}
      data={inventarioData}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}
