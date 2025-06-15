
import { FormWrapper } from '@/app/components/productos/FormWrapper';
import { fetchProducto } from '@/app/lib/api';
import { updateProducto, UpdateProductoResponse } from '@/app/lib/productos/editarProducto';
import { bebas_Neue } from '@/app/ui/fonts';
import { Breadcrumbs } from 'anjrot-components';

type PageProps = {
    params: {
        id: number;
    };
};
const EditProductoPage = async ({ params }: PageProps) => {
    const { id } = await params;

    const producto = await fetchProducto(id);

    const breadCrumbs = [
      { label: "Productos", href: "/dashboard/productos" },
      { label: "Editar Producto", href: `/dashboard/productos/${id}/edit`, active: true }
    ];

    const action = async (formData: FormData): Promise<UpdateProductoResponse> => {
        'use server';
        return updateProducto(formData, id);
    };
    return (
        <main className="min-h-screen flex flex-col items-center justify-start px-4 py-8">
            <div className="w-full max-w-2xl">
                    <Breadcrumbs
                      breadcrumb={breadCrumbs}
                      className={`${bebas_Neue.className} mb-6`}
                    />
                    <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
                      <h1 className="text-2xl font-bold mb-4 text-center">Editar Producto</h1>
            <FormWrapper  action={action} initialValues={producto} />
                    </div>
            </div>
        </main>
        
    );
};

export default EditProductoPage