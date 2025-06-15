import ParcelaShowWrapper from '@/app/components/parcelas/ShowWrapper';
import { fetchParcela } from '@/app/lib/api';
import { bebas_Neue } from '@/app/ui/fonts';
import { Breadcrumbs } from 'anjrot-components';
import { redirect } from 'next/navigation';

type PageProps = {
  params: { id: number };
};



const ParcelasShow = async ({ params }: PageProps) => {
  const { id } = await params;
  const breadCrumbs = [
    { label: "Parcelas", href: "/dashboard/parcelas" },
    { label: "Mostrar parcela", href: `/dashboard/parcelas/${id}/mostrar`, active: true }

  ];
  const parcela = await fetchParcela(params.id);
  if (!parcela.id) {
    redirect('/dashboard/parcelas');
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumb={breadCrumbs}
        className={`${bebas_Neue.className} mb-6`}
      />
      <ParcelaShowWrapper parcela={parcela} />
    </main>
  );
};

export default ParcelasShow;