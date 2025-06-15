'use client';

import { FaTruckLoading } from 'react-icons/fa';
import { bebas_Neue } from '@/app/ui/fonts';
import FormInventarioWrapper from '@/app/components/inventario/FormInventarioWrapper';
import InventarioTableWrapper from '@/app/components/inventario/InventarioTableWrapper';
import { useCallback, useState } from 'react';

export default function InventarioPage() {

    const [reloadTable, setReloadTable] = useState(false);

  const handleSuccess = useCallback(() => {
    setReloadTable(prev => !prev);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className={`${bebas_Neue.className} text-4xl font-extrabold text-gray-900 mb-8 flex items-center gap-4`}>
        <FaTruckLoading className="text-blue-600" /> Gestión de Inventario
      </h1>

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 bg-white rounded-xl shadow-xl border border-blue-500 overflow-hidden">
          <FormInventarioWrapper onSuccess={handleSuccess}/>
        </div>

        <div className="lg:w-2/3">
          <InventarioTableWrapper  reload={reloadTable}/>
        </div>
      </div>
    </main>
  );
}

