'use client';

import { useEffect, useState } from 'react';

import { Sector, Tratamiento } from '@/app/types';
import { fetchSectoresPorTipo, fetchTratamientos } from '@/app/lib/api';
import FormAplicaciones from './FormAplicaciones';

import { createAplicacion, CreateAplicacionResponse } from '@/app/lib/aplicaciones/crearAplicacion';





interface FormAplicacionesProps {
    onSuccess: () => void;
}

export default function FormInventarioWrapper({ onSuccess }: FormAplicacionesProps) {
    const [tratamientos, setTratamientos] = useState<Tratamiento[]>([]);
    const [sectores, setSectores] = useState<Sector[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingSectores, setLoadingSectores] = useState(false);

    useEffect(() => {
        fetchTratamientos().then((res) => {
            setTratamientos(res);
            setLoading(false);
        });
    }, []);

const cargarSectoresPorTipo = async (tipo_id: number) => {
  setLoadingSectores(true);
  try {
    const sectores = await fetchSectoresPorTipo(tipo_id);
    setSectores(sectores);
  } catch (error) {
    console.error('Error cargando sectores:', error);
    setSectores([]);
  } finally {
    setLoadingSectores(false);
  }
};

    const initialState: CreateAplicacionResponse = {
        success: false,
        message: '',
        errors: {},
        values: {},
    };


    if (loading) return <p className="text-center py-4">Cargando formulario...</p>;

    return (

        <FormAplicaciones
            tratamientos={tratamientos}
            sectores={sectores}
            loadingSectores={loadingSectores}
            onTipoChange={cargarSectoresPorTipo}
            initialState={initialState} onSuccess={onSuccess} action={createAplicacion} />
    );
}