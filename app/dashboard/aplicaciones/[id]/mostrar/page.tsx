import ShowWrapper from '@/app/components/aplicaciones/ShowWrapper';
import { fetchAplicacion } from '@/app/lib/api';
import { bebas_Neue } from '@/app/ui/fonts';
import { Breadcrumbs } from 'anjrot-components';
import { redirect } from 'next/navigation';

type PageProps = {
  params: { id: string };
};

const AplicacionShow = async ({ params }: PageProps) => {
  const id = Number(params.id);

  const breadCrumbs = [
    { label: "Aplicacion", href: "/dashboard/aplicaciones" },
    { label: "Mostrar aplicacion", href: `/dashboard/aplicaciones/${id}/mostrar`, active: true }
  ];

  const aplicacion = await fetchAplicacion(id);

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
