'use client';
import { bebas_Neue } from '@/app/ui/fonts';
import { useCallback, useState } from 'react';
import { SprayCan, ArrowLeft, Plus } from 'lucide-react';
import AplicacionesTableWrapper from '@/app/components/aplicaciones/AplicacionesTableWrapper';
import AplicacionesFormWrapper from '@/app/components/aplicaciones/AplicacionesFormWrapper';

export default function AplicacionesPage() {
  const [reloadTable, setReloadTable] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleSuccess = useCallback(() => {
    setReloadTable(prev => !prev);
    setMostrarFormulario(false); 
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className={`${bebas_Neue.className} text-4xl font-extrabold text-gray-900 mb-8 flex items-center gap-4`}>
        <SprayCan className="text-blue-600" /> Aplicaciones
      </h1>

      <div className="w-full max-w-7xl flex flex-col gap-4">
        <div className="flex justify-end">
          <button
            onClick={() => setMostrarFormulario(prev => !prev)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
          >
            {mostrarFormulario ? <ArrowLeft size={18} /> : <Plus size={18} />}
            {mostrarFormulario ? 'Volver' : 'Nueva aplicación'}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-xl border border-blue-500 overflow-hidden">
          {mostrarFormulario ? (
            <AplicacionesFormWrapper onSuccess={handleSuccess}/>
          ) : (
            <AplicacionesTableWrapper reload={reloadTable} />
          )}
        </div>
      </div>
    </main>
  );
}