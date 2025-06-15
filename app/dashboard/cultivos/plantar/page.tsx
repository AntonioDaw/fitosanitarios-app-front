'use client';
import { fetchCultivosTipos, fetchSectoresVacios, fetchTipos, plantarCultivo } from '@/app/lib/api';
import React, { useState, useEffect } from 'react';

type TipoCultivo = {
    id: number;
    nombre: string;
};

type Cultivo = {
    id: number;
    nombre: string;
};

type Sector = {
    parcela_nombre: string;
    id: number | string;
    numero_sector: string | number;
};

export default function PlantarFormConTipos() {
    const [tipos, setTipos] = useState<TipoCultivo[]>([]);
    const [cultivos, setCultivos] = useState<Cultivo[]>([]);
    const [sectores, setSectores] = useState<Sector[]>([]);
    const [tipoSeleccionado, setTipoSeleccionado] = useState<number | null>(null);
    const [cultivoSeleccionado, setCultivoSeleccionado] = useState<number | null>(null);
    const [sectorSeleccionado, setSectorSeleccionado] = useState<number | null>(null);
    const [mensaje, setMensaje] = useState<string>('');

    useEffect(() => {
        fetchTipos().then(setTipos);
    }, []);

    useEffect(() => {
        fetchSectoresVacios().then(setSectores);
    }, []);

    useEffect(() => {
        if (tipoSeleccionado) {
            fetchCultivosTipos(tipoSeleccionado).then(setCultivos);
        } else {
            setCultivos([]);
            setCultivoSeleccionado(null);
        }
    }, [tipoSeleccionado]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!cultivoSeleccionado || !sectorSeleccionado) {
            setMensaje('Selecciona cultivo y sector');
            return;
        }

        try {
            const data = await plantarCultivo(cultivoSeleccionado, sectorSeleccionado);
            setMensaje(data.message);

            fetchSectoresVacios().then(setSectores);

            setTipoSeleccionado(null);
            setCultivoSeleccionado(null);
            setSectorSeleccionado(null);
            setCultivos([]);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setMensaje(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg w-full bg-green-50 border border-green-200 p-6 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-green-800 text-center mb-4">Plantar nuevo cultivo</h2>

                <div>
                    <label htmlFor="tipo" className="block text-green-900 font-medium mb-1">
                        Tipo de cultivo
                    </label>
                    <select
                        id="tipo"
                        className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        value={tipoSeleccionado ?? ''}
                        onChange={e => setTipoSeleccionado(Number(e.target.value) || null)}
                    >
                        <option value="">-- Selecciona un tipo --</option>
                        {tipos.map(tipo => (
                            <option key={tipo.id} value={tipo.id}>
                                {tipo.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="cultivo" className="block text-green-900 font-medium mb-1">
                        Cultivo
                    </label>
                    <select
                        id="cultivo"
                        className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-100"
                        value={cultivoSeleccionado ?? ''}
                        onChange={e => setCultivoSeleccionado(Number(e.target.value) || null)}
                        disabled={!tipoSeleccionado}
                    >
                        <option value="">-- Selecciona un cultivo --</option>
                        {cultivos.map(cultivo => (
                            <option key={cultivo.id} value={cultivo.id}>
                                {cultivo.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="sector" className="block text-green-900 font-medium mb-1">
                        Sector
                    </label>
                    <select
                        id="sector"
                        className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        value={sectorSeleccionado ?? ''}
                        onChange={e => setSectorSeleccionado(Number(e.target.value) || null)}
                    >
                        <option value="">-- Selecciona un sector --</option>
                        {sectores.map(sector => (
                            <option key={sector.id} value={sector.id}>
                                {`Sector: ${sector.numero_sector} - Parcela: ${sector.parcela_nombre}`}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!cultivoSeleccionado || !sectorSeleccionado}
                >
                    Plantar cultivo
                </button>

                {mensaje && (
                    <div className="text-center mt-4 p-2 rounded bg-white border border-green-300 text-green-700">
                        {mensaje}
                    </div>
                )}
            </form>
        </div>
    );
}


