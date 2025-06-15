import { FormWrapper } from '@/app/components/parcelas/FormWrapper';
import { fetchParcela} from '@/app/lib/api';
import { updateParcela, UpdateParcelaResponse } from '@/app/lib/parcelas/editarParcela';
import { bebas_Neue } from '@/app/ui/fonts';
import { Breadcrumbs } from 'anjrot-components';

type PageProps = {
    params: {
        id: number;
    };
};
const EditProductoPage = async ({ params }: PageProps) => {
    const { id } = await params;

    const parcela = await fetchParcela(id);

    const breadCrumbs = [
      { label: "Parcelas", href: "/dashboard/parcelas" },
      { label: "Editar Parcela", href: `/dashboard/parcelas/${id}/edit`, active: true }
    ];

    const action = async (formData: FormData): Promise<UpdateParcelaResponse> => {
        'use server';
        return updateParcela(formData, id);
    };
    return (
        <main className="min-h-screen flex flex-col items-center justify-start px-4 py-8">
            <div className="w-full max-w-2xl">
                    <Breadcrumbs
                      breadcrumb={breadCrumbs}
                      className={`${bebas_Neue.className} mb-6`}
                    />
                    <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
                      <h1 className="text-2xl font-bold mb-4 text-center">Editar Parcela</h1>
            <FormWrapper  action={action} initialValues={parcela} />
                    </div>
            </div>
        </main>
        
    );
};

export default EditProductoPage