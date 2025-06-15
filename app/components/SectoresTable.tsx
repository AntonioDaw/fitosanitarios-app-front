import React from 'react';
import { Sector } from '../types';






interface SectoresTableProps {
    sectores: Sector[];
}

const SectoresTable: React.FC<SectoresTableProps> = ({ sectores }) => {
    if (!sectores || sectores.length === 0) {
        return <p>No hay sectores para mostrar.</p>;
    }

    return (
        <table className="min-w-full border-gray-400 border-collapse text-sm rounded-md overflow-hidden bg-slate-400">
            <thead>
                <tr className="bg-slate-700">
                    <th className="border  text-white border-gray-300 px-2 py-1">Nº Parcela</th>
                    <th className="border  text-white border-gray-300 px-2 py-1">Nombre Parcela</th>
                    <th className="border  text-white border-gray-300 px-2 py-1">Nº Sector</th>
                </tr>
            </thead>
            <tbody>
                {sectores.map((sector) => (
                    <tr key={sector.id}>
                        <td className="border border-gray-300 px-2 py-1">{sector.numero_parcela ?? 'N/A'}</td>
                        <td className="border border-gray-300 px-2 py-1">{sector.parcela_nombre ?? 'N/A'}</td>
                        <td className="border border-gray-300 px-2 py-1">{sector.numero_sector ?? 'N/A'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SectoresTable;