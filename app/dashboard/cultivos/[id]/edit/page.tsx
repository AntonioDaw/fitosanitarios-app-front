
import { CreateFormState } from '@/app/components/cultivos/CreateCultivoForm';
import FormWrapper from '@/app/components/cultivos/FormWrapper';
import { fetchCultivo, fetchTipos } from '@/app/lib/api';
import { updateCultivo } from '@/app/lib/cultivos/editarCultivo';
import { bebas_Neue } from '@/app/ui/fonts';
import { Breadcrumbs } from 'anjrot-components';

type PageProps = {
    params: {
        id: number;
    };
};

const EditCultivoPage = async ({ params }: PageProps) => {
    const { id } = await params;
    const tipos = await fetchTipos();
    const cultivo = await fetchCultivo(id);

    const breadCrumbs = [
      { label: "Cultivos", href: "/dashboard/cultivos" },
      { label: "Editar Cultivo", href: `/dashboard/cultivos/${id}/edit`, active: true }
    ];

    const action = async (formData: FormData): Promise<CreateFormState> => {
        'use server';
        return updateCultivo(id, formData);
    };
    return (
        <main className="min-h-screen flex flex-col items-center justify-start px-4 py-8">
            <div className="w-full max-w-2xl">
                    <Breadcrumbs
                      breadcrumb={breadCrumbs}
                      className={`${bebas_Neue.className} mb-6`}
                    />
                    <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
                      <h1 className="text-2xl font-bold mb-4 text-center">Editar Cultivo</h1>
            <FormWrapper tipos={tipos} action={action} initialValues={cultivo.data} />
                    </div>
            </div>
        </main>
        
    );
};

export default EditCultivoPage