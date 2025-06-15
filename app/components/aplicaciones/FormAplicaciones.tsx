/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useFormStatus } from 'react-dom'
import { useActionState, useEffect, useState } from 'react'
import { FaSave, FaSprayCan } from 'react-icons/fa'

import { Sector, Tratamiento } from '@/app/types'
import { CreateAplicacionResponse } from '@/app/lib/aplicaciones/crearAplicacion'
import { useSession } from 'next-auth/react'


interface FormAplicacionesProps {
    action: (formData: FormData) => Promise<CreateAplicacionResponse>
    tratamientos: Tratamiento[]
    sectores: Sector[]
    loadingSectores: boolean
    onTipoChange: (tipo_id: number) => void
    initialState: CreateAplicacionResponse
    onSuccess: () => void
}



export default function FormAplicaciones({
    action,
    tratamientos,
    sectores,
    loadingSectores,
    onTipoChange,
    initialState,
    onSuccess,
}: FormAplicacionesProps) {
    const { data: session } = useSession();
    const role = session?.user?.role;
    const idUser = session?.user.id;



    const [estadoUnidades, setEstadoUnidades] = useState<{ [k: string]: string }>({})
    const [state, formAction] = useActionState(
        async (_state: CreateAplicacionResponse | undefined, formData: FormData) => action(formData),
        initialState
    )
    const { pending } = useFormStatus()
    const [tratamientoId, setTratamientoId] = useState<string>('')
    const [productos, setProductos] = useState<any[]>([])
    const [sectoresSeleccionados, setSectoresSeleccionados] = useState<number[]>([])
    const [litrosSectores, setLitrosSectores] = useState<{ [k: string]: string }>({})

    useEffect(() => {
        if (state?.success) onSuccess()
    }, [state, onSuccess])

    useEffect(() => {
        const t = tratamientos.find(t => t.id.toString() === tratamientoId)
        if (t) {
            setProductos(t.productos || [])
            setSectoresSeleccionados([])
        } else {
            setProductos([])
            setSectoresSeleccionados([])
        }
    }, [tratamientoId, tratamientos])

    return (
        <form action={formAction} className="p-6 sm:p-8 space-y-6">
            {/* Mensaje error */}
            {state?.message && !state.success && <p className="text-red-500">{state.message}</p>}
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                <FaSprayCan className="text-blue-600" /> Nueva Aplicación
            </h3>

            {/* Usuario */}
            {role === 'admin' ? (
                <div>
                    <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 mb-1">Usuario:</label>
                    <select
                        id="usuario"
                        name="usuario"
                        className="mt-1 block w-full px-4 py-2 border rounded"
                        required
                    >
                        <option value="1">Perito</option>
                        <option value="2">Trabajador</option>
                    </select>
                    {state?.success === false && state.errors?.user_id && (
                        <p className="text-red-600 mt-1 text-sm">
                            {state.errors.user_id.join(', ')}
                        </p>
                    )}
                </div>
            ) : (
                <input type="hidden" name="usuario" value={idUser} />
            )}

            {/* Litros */}
            <div>
                <label htmlFor="litros" className="block text-sm font-medium text-gray-700 mb-1">Litros:</label>
                <input
                    type="number"
                    id="litros"
                    name="litros"
                    step="0.01"
                    min="0.01"
                    className="mt-1 block w-full px-4 py-2 border rounded"
                    required
                />
            </div>
            {state?.success === false && state.errors?.litros && (
                <p className="text-red-600 mt-1 text-sm">
                    {state.errors.litros.join(', ')}
                </p>
            )}

            {/* Tratamiento */}
            <div>
                <label htmlFor="tratamiento_id" className="block text-sm font-medium text-gray-700 mb-1">Tratamiento:</label>
                <select
                    id="tratamiento_id"
                    name="tratamiento_id"
                    value={tratamientoId}
                    onChange={e => {
                        const selectedId = e.target.value
                        setTratamientoId(selectedId)

                        const selectedTratamiento = tratamientos.find(t => t.id.toString() === selectedId)
                        if (selectedTratamiento) {
                            onTipoChange(selectedTratamiento.tipo.id)
                        }
                    }}
                    className="mt-1 block w-full px-4 py-2 border rounded"
                    required
                >
                    <option value="" disabled>Selecciona un tratamiento</option>
                    {tratamientos.map(t => (
                        <option key={t.id} value={t.id}>
                            {t.descripcion} {new Date(t.created_at).toLocaleDateString('es-ES')}
                        </option>
                    ))}
                </select>
                {state?.success === false && state.errors?.tratamiento && (
                    <p className="text-red-600 mt-1 text-sm">
                        {state.errors.tratamiento.join(', ')}
                    </p>
                )}
            </div>

            {/* Productos y unidades */}
            {productos.map((producto, i) => (
                <div key={producto.id} className="border p-4 rounded bg-gray-50">
                    <h4 className="font-semibold mb-2">{producto.nombre}</h4>
                    <button
                        type="button"
                        onClick={() =>
                            setProductos(prev =>
                                prev.map((p, idx) => idx === i ? { ...p, showUnidades: !p.showUnidades } : p)
                            )
                        }
                        className="w-full border bg-blue-100 text-blue-900 rounded px-3 py-2 flex justify-between"
                    >
                        {producto.unidadesSeleccionadas?.length > 0
                            ? `${producto.unidadesSeleccionadas.length} seleccionadas`
                            : 'Selecciona unidades'}
                        <span>{!producto.showUnidades ? '▼' : '▲'}</span>
                    </button>

                    {producto.showUnidades && (
                        <div className="mt-2 p-2 bg-white border rounded max-h-60 overflow-auto">
                            {producto.unidad_productos.map((unidad: any) => {
                                const sel = producto.unidadesSeleccionadas?.includes(unidad.id)
                                return (
                                    <div key={unidad.id} className="flex items-center justify-between p-1 hover:bg-blue-50 rounded">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                onChange={e => {
                                                    const checked = e.target.checked
                                                    setProductos(prev =>
                                                        prev.map((p, idx) => {
                                                            if (idx !== i) return p
                                                            const arr = p.unidadesSeleccionadas || []
                                                            return {
                                                                ...p,
                                                                unidadesSeleccionadas: checked
                                                                    ? [...arr, unidad.id]
                                                                    : arr.filter((id: any) => id !== unidad.id)
                                                            }
                                                        })
                                                    )
                                                    if (!checked) {
                                                        setEstadoUnidades(prev => {
                                                            const c = { ...prev }
                                                            delete c[`${i}_${unidad.id}`]
                                                            return c
                                                        })
                                                    }
                                                }}
                                                className="mr-2 accent-blue-600"
                                            />
                                            {unidad.codigo_interno}
                                        </label>
                                        {sel && (
                                            <select
                                                value={estadoUnidades[`${i}_${unidad.id}`] ?? unidad.estado?.toString() ?? '0'}
                                                onChange={e => setEstadoUnidades(prev => ({ ...prev, [`${i}_${unidad.id}`]: e.target.value }))}
                                                className="border rounded px-2 py-1"
                                                name=""
                                            >
                                                <option value="0">Completo</option>
                                                <option value="1">Resto</option>
                                                <option value="2">Gastado</option>
                                            </select>
                                        )}

                                        {sel && (
                                            <input
                                                type="hidden"
                                                name="unidad_productos[]"
                                                value={JSON.stringify({ id: unidad.id, estado: Number(estadoUnidades[`${i}_${unidad.id}`] || 0) })}
                                            />
                                        )}
                                    </div>
                                )
                            })}

                        </div>
                    )}
                </div>
            ))}
            {state?.success === false && state.errors?.unidad_productos && (
                <p className="text-red-600 mt-1 text-sm">
                    {state.errors.unidad_productos.join(', ')}
                </p>
            )}
            {/* Sectores */}
            <div className="border p-4 rounded bg-gray-50">
                <h4 className="font-semibold mb-2">Sectores</h4>
                {loadingSectores ? <p>Cargando...</p> : (
                    <div className="max-h-60 overflow-auto">
                        {sectores.map(sec => {
                            const sel = sectoresSeleccionados.includes(sec.id)
                            return (
                                <div key={sec.id} className="flex items-center justify-between p-1 hover:bg-blue-50 rounded">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={sel}
                                            onChange={() => {
                                                setSectoresSeleccionados(prev =>
                                                    prev.includes(sec.id) ? prev.filter(id => id !== sec.id) : [...prev, sec.id]
                                                )
                                                if (sel) {
                                                    setLitrosSectores(prev => {
                                                        const c = { ...prev }
                                                        delete c[sec.id]
                                                        return c
                                                    })
                                                }
                                            }}
                                            className="mr-2 accent-blue-600"
                                        />
                                        Nº{sec.numero_sector}, parcela {sec.parcela_nombre}
                                    </label>
                                    {sel && (
                                        <input
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            placeholder="Litros"
                                            value={litrosSectores[sec.id] || ''}
                                            onChange={e => setLitrosSectores(prev => ({ ...prev, [sec.id]: e.target.value }))}
                                            className="w-24 border rounded px-2 py-1"
                                        />
                                    )}
                                    {sel && (
                                        <input
                                            type="hidden"
                                            name="sectors[]"
                                            value={JSON.stringify({ id: sec.id, litros_aplicados: parseFloat(litrosSectores[sec.id] || '0') })}
                                        />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
            {state?.success === false && state.errors?.sectors && (
                <p className="text-red-600 mt-1 text-sm">
                    {state.errors.sectors.join(', ')}
                </p>
            )}
            {state?.success === false && state.errors?.litros_aplicados && (
                <p className="text-red-600 mt-1 text-sm">
                    {state.errors.litros_aplicados.join(', ')}
                </p>
            )}


            {/* Botón */}
            <div className="flex justify-end pt-4 border-t">
                <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={pending}
                >
                    {pending ? 'Guardando...' : (<><FaSave className="inline mr-2" />Registrar Aplicación</>)}
                </button>
            </div>
        </form>
    )
}
