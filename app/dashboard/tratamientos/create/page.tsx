
import { FormWrapper } from '@/app/components/tratamientos/FormWrapper';
import { fetchCultivos, fetchProductos, fetchTipos } from '@/app/lib/api';

import { createTratamiento, CreateTratamientoResponse } from '@/app/lib/tratamientos/crearTratamiento';
import { bebas_Neue } from '@/app/ui/fonts';
import { Breadcrumbs } from 'anjrot-components';

const breadCrumbs = [
    { label: "Cultivos", href: "/dashboard/tratamientos" },
    { label: "Añadir Tratamiento", href: "/dashboard/tratamientos/create", active: true }
];

export default async function CrearTratamientoPage() {
    const cultivos = await fetchCultivos();
    const productos = await fetchProductos();
    const tipos = await fetchTipos();
    const action = async (formData: FormData): Promise<CreateTratamientoResponse> => {
            'use server';
            return createTratamiento(formData);
        };
    return (
        <main>
            
                <Breadcrumbs
                    breadcrumb={breadCrumbs}
                    className={`${bebas_Neue.className} mb-6`}
                />

                <FormWrapper cultivos={cultivos} productos={productos} tipos={tipos} action={action} />

            
        </main>
    );
}






