'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';
import { XCircle } from 'lucide-react';
import { accionAplicacion } from '../lib/api';

export default function AccionesAplicacion({ id }: { id: number }) {
    const [loading, setLoading] = useState<'aprobar' | 'rechazar' | null>(null);
    const router = useRouter();

    const handleAccion = async (accion: 'aprobar' | 'rechazar') => {
    setLoading(accion);
    const loadingToast = toast.loading(`${accion === 'aprobar' ? 'Aprobando' : 'Rechazando'} aplicación...`);

    try {
      await accionAplicacion(id, accion);
      toast.success(`Aplicación ${accion === 'aprobar' ? 'aprobada' : 'rechazada'} correctamente`);
      setTimeout(() => {
        router.push('/dashboard/aplicaciones');
      }, 1000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || `Error al ${accion === 'aprobar' ? 'aprobar' : 'rechazar'} la aplicación`);
    } finally {
      setLoading(null);
      toast.dismiss(loadingToast);
    }
  };


    return (
        
        <div className="flex gap-3">
            <button
                onClick={() => handleAccion('aprobar')}
                disabled={loading !== null}
                className={`flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                <FaCheck/> {loading === 'aprobar' ? 'Aprobando...' : 'Aprobar'}
            </button>

            <button
                onClick={() => handleAccion('rechazar')}
                disabled={loading !== null}
                className={`flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                <XCircle/> {loading === 'rechazar' ? 'Rechazando...' : 'Rechazar'}
            </button>
        </div>
    );
}
