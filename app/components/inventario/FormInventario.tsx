'use client'
import { adquirirProducto, AdquisicionResponse } from "@/app/lib/inventario/adquirirProducto";
import { Producto, Proveedor } from "@/app/types";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { FaSave, FaTruck } from "react-icons/fa";

interface FormInventarioProps {
    onSuccess: () => void;
    productos: Producto[];
    proveedores: Proveedor[];
    initialState: AdquisicionResponse;
}

function FormInventario({ onSuccess, productos, proveedores, initialState }: FormInventarioProps) {
    const [state, formAction] = useActionState(adquirirProducto, initialState);
    const { pending } = useFormStatus();


    useEffect(() => {
        if (state?.success && state?.message) {

            alert(state.message);
            onSuccess();
        }
    }, [onSuccess, state]);


    return (
        <form action={formAction} className="p-6 sm:p-8 space-y-6 space_between">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                <FaTruck className="text-blue-600" /> Nueva Adquisición
            </h3>

            {/* Campo Producto */}
            <div>
                <label htmlFor="producto_id" className="block text-sm font-medium text-gray-700 mb-1">
                    Producto:
                </label>
                <select
                    id="producto_id"
                    name="producto_id"
                    defaultValue={state?.values?.producto_id || ''}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                >
                    <option value="" disabled>Selecciona un producto</option>
                    {productos.map((producto) => (
                        <option key={producto.id} value={producto.id}>
                            {producto.nombre}
                        </option>
                    ))}
                </select>
                {state?.errors?.producto_id && (
                    <p className="text-sm text-red-500 mt-1">{state.errors.producto_id[0]}</p>
                )}
            </div>

            {/* Campo Proveedor */}
            <div>
                <label htmlFor="proveedor_id" className="block text-sm font-medium text-gray-700 mb-1">
                    Proveedor:
                </label>
                <select
                    id="proveedor_id"
                    name="proveedor_id"
                    defaultValue={state?.values?.proveedor_id || ''}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                >
                    <option value="" disabled>Selecciona un proveedor</option>
                    {proveedores.map((proveedor) => (
                        <option key={proveedor.id} value={proveedor.id}>
                            {proveedor.nombre}
                        </option>
                    ))}
                </select>
                {state?.errors?.proveedor_id && (
                    <p className="text-sm text-red-500 mt-1">{state.errors.proveedor_id[0]}</p>
                )}
            </div>

            {/* Campo Cantidad */}
            <div>
                <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad:
                </label>
                <input
                    type="number"
                    id="cantidad"
                    name="cantidad"
                    min="1"
                    step="1"
                    defaultValue={state?.values?.cantidad || ''}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Ej: 100"
                    required
                />
                {state?.errors?.cantidad && (
                    <p className="text-sm text-red-500 mt-1">{state.errors.cantidad[0]}</p>
                )}
            </div>

            {/* Mensaje de error general del formulario */}
            {state?.message && !state.success && (
                <p className="text-sm text-red-500 mt-4 text-center">{state.message}</p>
            )}

            {/* Botón de envío */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-disabled={pending}
                    disabled={pending}
                >
                    {pending ? 'Guardando...' : <><FaSave className="w-5 h-5" /> Registrar Adquisición</>}
                </button>
            </div>
        </form>
    );
}

export default FormInventario;