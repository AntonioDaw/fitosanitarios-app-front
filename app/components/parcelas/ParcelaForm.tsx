'use client';

import { useActionState } from 'react';
import { CreateParcelaResponse } from '@/app/lib/parcelas/crearParcela';

interface ParcelaFormProps {
    action: (formData: FormData) => Promise<CreateParcelaResponse>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialData?: Partial<Record<string, any>>;
}

const initialState: CreateParcelaResponse = {
    success: false,
    message: '',
    errors: {},
    values: {},
};

export default function ParcelaForm({ action, initialData = {} }: ParcelaFormProps) {

    const initialStateWithValues = {
        ...initialState,
        values: initialData,
    };

    const wrappedAction = async (_state: CreateParcelaResponse, formData: FormData) => {
        return await action(formData);
    };
    const [state, formAction] = useActionState(wrappedAction, initialStateWithValues);

    return (
        <form action={formAction} className="space-y-4">
            {!state.success && state.message && (
                <p className="text-red-600 text-sm">{state.message}</p>
            )}

            <div>
                <label className="block text-sm font-medium">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    defaultValue={state.values?.nombre || ''}
                    className="w-full border rounded p-2"
                />
                {!state.success && state.errors?.nombre && (
                    <p className="text-sm text-red-500">{state.errors.nombre[0]}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium">numero_parcela</label>
                <input
                    type="text"
                    name="numero_parcela"
                    defaultValue={state.values?.numero_parcela || ''}
                    className="w-full border rounded p-2"
                />
                {!state.success && state.errors?.numero_parcela && (
                    <p className="text-sm text-red-500">{state.errors.numero_parcela[0]}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium">Área</label>
                <input
                    type="text"
                    name="area"
                    defaultValue={state.values?.area || ''}
                    className="w-full border rounded p-2"
                />
                {!state.success && state.errors?.area && (
                    <p className="text-sm text-red-500">{state.errors.area[0]}</p>
                )}
            </div>
            {Object.keys(initialData).length === 0 && (
              <div>
                <label className=" block text-sm font-medium">Número de Sectores</label>
                <input
                    type="number"
                    name="n_sectores"
                    defaultValue={state.values?.n_sectores || ''}
                    className="w-full border rounded p-2"
                />
                {!state.success && state.errors?.n_sectores && (
                    <p className="text-sm text-red-500">{state.errors.n_sectores[0]}</p>
                    
                )}

            </div>)  
            }
            

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Guardar Parcela
            </button>
        </form>
    );
}

