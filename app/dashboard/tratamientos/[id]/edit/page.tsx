import { FormWrapper } from "@/app/components/tratamientos/FormWrapper";
import { fetchCultivos, fetchProductos, fetchTipos, fetchTratamiento } from "@/app/lib/api";

import { updateTratamiento, UpdateTratamientoResponse } from "@/app/lib/tratamientos/editarTratamiento";
import { bebas_Neue } from "@/app/ui/fonts";
import { Breadcrumbs } from "anjrot-components";
import { redirect } from "next/navigation";


type PageProps = {
    params: {
        id: number;
    };
};

const EditTratamientoPage = async ({ params }: PageProps) => {
    const { id } = await params;
    const tipos = await fetchTipos();
    const cultivos = await fetchCultivos();
    const productos = await fetchProductos();
    const tratamiento = await fetchTratamiento(id);
    if (!tratamiento.tipo) {
        redirect('/dashboard/tratamientos');
    }
    const breadCrumbs = [
        { label: "Tratamientos", href: "/dashboard/tratamientos" },
        { label: "Mostrar tratamiento", href: `/dashboard/tratamientos/${id}/mostrar` },
        { label: "Editar Tratamiento", href: `/dashboard/tratamientos/${id}/edit`, active: true }
    ];

    const action = async (formData: FormData): Promise<UpdateTratamientoResponse> => {
        'use server';
        return updateTratamiento(formData, id);
    };
    return (
        <main>
            <Breadcrumbs
                breadcrumb={breadCrumbs}
                className={`${bebas_Neue.className} mb-6`}
            />


            <FormWrapper cultivos={cultivos} productos={productos} tipos={tipos} action={action} initialData={{
                descripcion: tratamiento.descripcion,
                tipo_id: tratamiento.tipo.id,
                cultivos: tratamiento.cultivos.map(c => c.id),
                productos: tratamiento.productos.map(p => ({
                    id: p.id,
                    cantidad_por_100_litros: Number(p.cantidad_por_100_litros)
                }))
            }} />

        </main>

    );
};

export default EditTratamientoPage