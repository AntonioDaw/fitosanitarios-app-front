import FormWrapper from "@/app/components/cultivos/FormWrapper";
import { fetchTipos } from "@/app/helpers/api";
import { bebas_Neue } from "@/app/ui/fonts";
import { Breadcrumbs } from "anjrot-components";

const breadCrumbs = [
  { label: "Cultivos", href: "/dashboard/cultivos" },
  { label: "Añadir Cultivo", href: "/dashboard/cultivos/create", active: true }
];

const AñadirCultivo = async () => {
  const getTipos = await fetchTipos();

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-8">
      <div className="w-full max-w-2xl">
        <Breadcrumbs
          breadcrumb={breadCrumbs}
          className={`${bebas_Neue.className} mb-6`}
        />
        <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
          <h1 className="text-2xl font-bold mb-4 text-center">Nuevo Cultivo</h1>
          <FormWrapper tipos={getTipos} />
        </div>
      </div>
    </main>
  );
};

export default AñadirCultivo;