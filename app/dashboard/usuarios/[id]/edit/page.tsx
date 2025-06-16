
import { FormWrapper } from '@/app/components/usuarios/FormWrapper';
import { fetchUsuario } from '@/app/lib/api';
import { updateUsuario, UpdateUsuarioResponse } from '@/app/lib/usuarios/editarUsuario';
import { bebas_Neue } from '@/app/ui/fonts';
import { Breadcrumbs } from 'anjrot-components';

type PageProps = {
    params: {
        id: number;
    };
};
const EditUsuarioPage = async ({ params }: PageProps) => {
    const { id } = await params;

    const usuario = await fetchUsuario(id);

    const breadCrumbs = [
      { label: "Usuarios", href: "/dashboard/usuarios" },
      { label: "Editar Usuario", href: `/dashboard/usuarios/${id}/edit`, active: true }
    ];

    const action = async (formData: FormData): Promise<UpdateUsuarioResponse> => {
        'use server';
        return updateUsuario(formData, id);
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
            <FormWrapper  action={action} initialValues={usuario} />
                    </div>
            </div>
        </main>
        
    );
};

export default EditUsuarioPage