
import { FormWrapper } from "@/app/components/parcelas/FormWrapper";
import { createParcela, CreateParcelaResponse } from "@/app/lib/parcelas/crearParcela";
import { bebas_Neue } from "@/app/ui/fonts";
import { Breadcrumbs } from "anjrot-components";



const AñadirCultivo = async () => {

    const breadCrumbs = [
        { label: "Parcelas", href: "/dashboard/parcelas" },
        { label: "Crear Parcela", href: `/dashboard/parcelas/Crear`, active: true }
    ];
     const action = async (formData: FormData): Promise<CreateParcelaResponse> => {
                'use server';
                return createParcela(formData);
            };
    
    return (
        <main className="min-h-screen flex flex-col items-center justify-start px-4 py-8">
            <div className="w-full max-w-2xl">
                <Breadcrumbs
                    breadcrumb={breadCrumbs}
                    className={`${bebas_Neue.className} mb-6`}
                />
                <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
                    <h1 className="text-2xl font-bold mb-4 text-center">Nuevo Cultivo</h1>
                    <FormWrapper action={action} />
                </div>
            </div>
        </main>
    );
};

export default AñadirCultivo;
