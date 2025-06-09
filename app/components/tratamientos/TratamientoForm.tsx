'use client';

import { createTratamiento } from '@/app/lib/tratamientos/crearTratamiento';
import React, { useState } from 'react';

interface Cultivo {
    id: number;
    nombre: string;
    tipo_id: number;
}

interface Producto {
    id: number;
    nombre: string;
}
interface Tipos {
    id: number;
    nombre: string;
}

interface TratamientoFormProps {
    cultivosDisponibles: Cultivo[];
    productosDisponibles: Producto[];
    tiposDisponibles: Tipos[];
}

export default function TratamientoForm({ cultivosDisponibles, productosDisponibles, tiposDisponibles }: TratamientoFormProps) {
    
    const [errores, setErrores] = useState<string[]>([]);
    const [exito, setExito] = useState<string>('');
    const [descripcion, setDescripcion] = useState('');
    const [cultivosSeleccionados, setCultivosSeleccionados] = useState<number[]>([]);
    const [productosSeleccionados, setProductosSeleccionados] = useState<number[]>([]);
    const [showCultivosDropdown, setShowCultivosDropdown] = useState(false);
    const [showProductosDropdown, setShowProductosDropdown] = useState(false);
    const [tipos] = useState(tiposDisponibles);
    const [tipoSeleccionado, setTipoSeleccionado] = useState<number | null>(null);
    const [cantidad_por_100_litros, setCantidadesPorLitro] = useState<{ [productoId: number]: number }>({});
    const handleCantidadChange = (id: number, valor: string) => {
        const cantidad = parseFloat(valor);
        if (!isNaN(cantidad)) {
            setCantidadesPorLitro(prev => ({ ...prev, [id]: cantidad }));
        } else {
            setCantidadesPorLitro(prev => {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            });
        }
    };
    const toggleSeleccion = (id: number, selectedArray: number[], setSelectedArray: React.Dispatch<React.SetStateAction<number[]>>) => {
        if (selectedArray.includes(id)) {
            setSelectedArray(selectedArray.filter(i => i !== id));
        } else {
            setSelectedArray([...selectedArray, id]);
        }
    };

    const formAction = async (formData: FormData) => {
        const response = await createTratamiento(formData);

        if (!response.success) {
            setErrores(Object.values(response.errors || {}).flat());
            setExito('');
            return;
        }

        
        setErrores([]);
        setExito('Tratamiento creado correctamente.');

        
        setDescripcion('');
        setTipoSeleccionado(null);
        setCultivosSeleccionados([]);
        setProductosSeleccionados([]);
        setCantidadesPorLitro({});
        setShowCultivosDropdown(false);
        setShowProductosDropdown(false);
    };
    return (
        <form action={formAction} className="max-w-4xl mx-auto bg-green-50 p-8 rounded-2xl shadow-xl border border-green-200 space-y-6">
            <h2 className="text-2xl font-bold text-green-800 text-center mb-4">Crear Tratamiento</h2>
            {errores.length > 0 && (
                <div className="bg-red-100 border border-red-300 text-red-800 rounded p-4">
                    <ul className="list-disc pl-5">
                        {errores.map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}

            {exito && (
                <div className="bg-green-100 border border-green-300 text-green-800 rounded p-4">
                    {exito}
                </div>
            )}
            <div>
                <label htmlFor="descripcion" className="block font-semibold text-green-900 mb-1">Descripción</label>
                <textarea
                    name="descripcion"
                    id="descripcion"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                    className="w-full border border-green-300 bg-green-100 text-green-900 rounded px-3 py-2 resize-y min-h-[100px] focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Describe brevemente el tratamiento..."
                    required
                />
            </div>

            <select
                id="tipo"
                name="tipo"
                value={tipoSeleccionado ?? ''}
                onChange={(e) => {
                    const tipo = e.target.value ? parseInt(e.target.value) : null;
                    setTipoSeleccionado(tipo);
                    setCultivosSeleccionados([]); // Limpia si cambia de tipo
                }}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
                required
            >
                <option value="">Seleccione un tipo</option>
                {tipos.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                        {tipo.nombre}
                    </option>
                ))}
            </select>


            {/* Cultivos */}
            <button
                type="button"
                onClick={() => tipoSeleccionado && setShowCultivosDropdown(!showCultivosDropdown)}
                disabled={!tipoSeleccionado}
                className={`w-full border bg-green-100 text-green-900 rounded px-3 py-2 text-left flex justify-between items-center ${tipoSeleccionado ? 'hover:bg-green-200 cursor-pointer' : 'cursor-not-allowed opacity-60'
                    }`}
            >
                {cultivosSeleccionados.length > 0
                    ? `${cultivosSeleccionados.length} seleccionados`
                    : tipoSeleccionado ? 'Selecciona cultivos' : 'Seleccione un tipo primero'}
                <span>{!showCultivosDropdown ? '▼' : '▲'}</span>
            </button>

            {showCultivosDropdown && tipoSeleccionado && (
                <div className="w-full bg-white border border-green-300 rounded mt-2 max-h-60 overflow-auto shadow-inner">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 px-3 py-2">
                        {cultivosDisponibles
                            .filter(c => c.tipo_id === tipoSeleccionado)
                            .map(cultivo => (
                                <label
                                    key={cultivo.id}
                                    className="flex items-center cursor-pointer hover:bg-green-100 rounded px-2 py-1"
                                >
                                    <input
                                        name="cultivos[]"
                                        value={cultivo.id}
                                        type="checkbox"
                                        checked={cultivosSeleccionados.includes(cultivo.id)}
                                        onChange={() => toggleSeleccion(cultivo.id, cultivosSeleccionados, setCultivosSeleccionados)}
                                        className="mr-2 accent-green-600"
                                    />

                                    {cultivo.nombre}

                                </label>
                            ))}
                    </div>
                </div>
            )}

            {/* Productos */}
            <div>
                <label className="block font-semibold text-green-900 mb-1">Productos</label>
                <button
                    type="button"
                    onClick={() => setShowProductosDropdown(!showProductosDropdown)}
                    className="w-full border border-green-300 bg-green-100 text-green-900 rounded px-3 py-2 text-left flex justify-between items-center hover:bg-green-200"
                >
                    {productosSeleccionados.length > 0
                        ? `${productosSeleccionados.length} seleccionados`
                        : 'Selecciona productos'}
                    <span>{!showProductosDropdown ? '▼' : '▲'}</span>
                </button>

                {showProductosDropdown && (
                    <div className="w-full bg-white border border-green-300 rounded mt-2 max-h-60 overflow-auto shadow-inner">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 px-3 py-2">
                            {productosDisponibles.map(producto => (
                                <label
                                    key={producto.id}
                                    className="flex items-center cursor-pointer hover:bg-green-100 rounded px-2 py-1"
                                >
                                    <input
                                        name="productos[]"
                                        type="checkbox"
                                        value={producto.id}
                                        checked={productosSeleccionados.includes(producto.id)}
                                        onChange={() => toggleSeleccion(producto.id, productosSeleccionados, setProductosSeleccionados)}
                                        className="mr-2 accent-green-600"
                                    />
                                    {producto.nombre}
                                    {productosSeleccionados.includes(producto.id) && (
                                        <input
                                            type="number"
                                            step="any"
                                            name={`cantidades[${producto.id}]`}
                                            placeholder="ml/100L"
                                            value={cantidad_por_100_litros[producto.id] ?? ''}
                                            onChange={(e) => handleCantidadChange(producto.id, e.target.value)}
                                            className="w-25 border border-green-300 bg-green-50 rounded px-2 py-1 text-right text-sm justify-self-end ml-auto"
                                            required
                                        />

                                    )}
                                </label>

                            ))}
                        </div>
                    </div>
                )}
            </div>
            <input
                type="hidden"
                name="productos"
                value={JSON.stringify(
                    productosSeleccionados.map(id => ({
                        id,
                        cantidad_por_100_litros: String(cantidad_por_100_litros[id] ?? '0'),
                    }))
                )}
            />
            <div className="text-center">
                <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-semibold shadow"
                >
                    Crear Tratamiento
                </button>
            </div>
        </form>
    );
}
