import ShowWrapper from '@/app/components/aplicaciones/ShowWrapper';
import { fetchAplicacion } from '@/app/lib/api';
import { bebas_Neue } from '@/app/ui/fonts';
import { Breadcrumbs } from 'anjrot-components';
import { redirect } from 'next/navigation';

type PageProps = {
  params: { id: number };
};



const AplicacionShow = async ({ params }: PageProps) => {
  const { id } = await params;
  const breadCrumbs = [
    { label: "Aplicacion", href: "/dashboard/aplicaciones" },
    { label: "Mostrar aplicacion", href: `/dashboard/aplicaciones/${id}/mostrar`, active: true }

  ];
  const aplicacion = await fetchAplicacion(params.id);
  if (!aplicacion.id) {
    redirect('/dashboard/aplicaciones');
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumb={breadCrumbs}
        className={`${bebas_Neue.className} mb-6`}
      />
      <ShowWrapper aplicacion={aplicacion} />
    </main>
  );
};

export default AplicacionShow;