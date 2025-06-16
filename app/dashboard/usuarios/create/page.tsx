

import { FormWrapper } from "@/app/components/usuarios/FormWrapper";
import { createUsuario, CreateUsuarioResponse } from "@/app/lib/usuarios/crearUsuario";
import { bebas_Neue } from "@/app/ui/fonts";
import { Breadcrumbs } from "anjrot-components";



const AñadirUsuario = async () => {

    const breadCrumbs = [
        { label: "Usarios", href: "/dashboard/usuarios" },
        { label: "Crear Usuario", href: `/dashboard/usuarios/Crear`, active: true }
    ];
     const action = async (formData: FormData): Promise<CreateUsuarioResponse> => {
                'use server';
                return createUsuario(formData);
            };
    
    return (
        <main className="min-h-screen flex flex-col items-center justify-start px-4 py-8">
            <div className="w-full max-w-2xl">
                <Breadcrumbs
                    breadcrumb={breadCrumbs}
                    className={`${bebas_Neue.className} mb-6`}
                />
                <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
                    <h1 className="text-2xl font-bold mb-4 text-center">Nuevo Usuario</h1>
                    <FormWrapper action={action} />
                </div>
            </div>
        </main>
    );
};

export default AñadirUsuario;