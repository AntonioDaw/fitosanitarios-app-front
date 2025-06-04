
import { CreateFormState } from '@/app/components/cultivos/CreateCultivoForm';
import FormWrapper from '@/app/components/cultivos/FormWrapper';
import { fetchCultivo, fetchTipos } from '@/app/helpers/api';
import { updateCultivo } from '@/app/helpers/editarCultivo';

type PageProps = {
    params: {
        id: number;
    };
};

const EditCultivoPage = async ({ params }: PageProps) => {
    const { id } = await params; // ✅ así es correcto en Next.js 15
    const tipos = await fetchTipos();
    const cultivo = await fetchCultivo(id); // trae datos para editar
    // Inline action que inyecta el ID
    const action = async (formData: FormData): Promise<CreateFormState> => {
        'use server';
        return updateCultivo(id, formData);
    };
    return (

        <FormWrapper tipos={tipos} action={action} initialValues={cultivo.data} />
    );
};

export default EditCultivoPage