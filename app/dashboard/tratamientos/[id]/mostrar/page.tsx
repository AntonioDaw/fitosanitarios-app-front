
import TratamientoShowWrapper from '@/app/components/tratamientos/ShowWrapper';
import { fetchTratamiento } from '@/app/lib/api';

type PageProps = {
  params: { id: number};
};

const TratamientosShow = async ({ params }: PageProps) => {
  const tratamiento = await fetchTratamiento(Number(params.id));
  return <TratamientoShowWrapper tratamiento={tratamiento} />;
};

export default TratamientosShow;