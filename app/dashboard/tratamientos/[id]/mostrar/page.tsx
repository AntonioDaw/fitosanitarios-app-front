
import TratamientoShowWrapper from '@/app/components/tratamientos/ShowWrapper';
import { fetchTratamiento } from '@/app/lib/api';
import { bebas_Neue } from '@/app/ui/fonts';
import { Breadcrumbs } from 'anjrot-components';
import { redirect } from 'next/navigation';

type PageProps = {
  params: { id: number };
};



const TratamientosShow = async ({ params }: PageProps) => {
  const { id } = await params;
  const breadCrumbs = [
    { label: "Tratamientos", href: "/dashboard/tratamientos" },
    { label: "Mostrar tratamiento", href: `/dashboard/tratamientos/${id}/mostrar`, active: true }

  ];
  const tratamiento = await fetchTratamiento(Number(params.id));
  if (!tratamiento.id) {
    redirect('/dashboard/tratamientos');
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumb={breadCrumbs}
        className={`${bebas_Neue.className} mb-6`}
      />
      <TratamientoShowWrapper tratamiento={tratamiento} />
    </main>
  );
};

export default TratamientosShow;