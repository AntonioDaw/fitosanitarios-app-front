
import { bebas_Neue } from "@/app/ui/fonts";
import { Breadcrumbs } from "anjrot-components";
import { createProducto, CreateProductoResponse } from "@/app/lib/productos/crearProducto";
import { FormWrapper } from "@/app/components/productos/FormWrapper";

const breadCrumbs = [
  { label: "Producto", href: "/dashboard/productos" },
  { label: "Añadir Producto", href: "/dashboard/productos/create", active: true }
];

const AñadirProducto = async () => {
  const action = async (formData: FormData): Promise<CreateProductoResponse> => {
    'use server';
    return createProducto(formData);
  };
  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-8">
      <div className="w-full max-w-2xl">
        <Breadcrumbs
          breadcrumb={breadCrumbs}
          className={`${bebas_Neue.className} mb-6`}
        />
        <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
          <h1 className="text-2xl font-bold mb-4 text-center">Nuevo Producto</h1>
          <FormWrapper action={action} />
        </div>
      </div>
    </main>
  );
};

export default AñadirProducto;
