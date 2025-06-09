import InfoCard from '@/app/components/InfoCard';
import TratamientosTable from '@/app/components/tratamientos/TratamientosTable';
import { fetchTipos, fetchTratamientosTipo } from '@/app/lib/api';
import { bebas_Neue } from '@/app/ui/fonts';
import Link from 'next/link';






const TratamientosPrincipal = async () => {
  const tipos = await fetchTipos();
  const TratamientosPorTipo = await Promise.all(
    tipos.map((tipo: { id: number; }) => fetchTratamientosTipo(tipo.id))
  );

  return (
    <main>
      <div className='flex items-center justify-between mb-6 px-4 py-2'>
        <h1 className={`${bebas_Neue}.className} mb-4 text-xl md:text-2xl`}>Tratamientos</h1>
        <Link
          href={`/dashboard/tratamientos/create`}
          className="px-7 py-4 rounded bg-green-700 text-white font-medium hover:bg-green-900 disabled:opacity-50"
        >
          Crear
        </Link>
      </div>


      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tipos.map((tipo: { id: number; nombre: string; icono_url: string; }, index: number) => (
          <div key={tipo.id} className="flex flex-col">
            <InfoCard
              title={tipo.nombre}
              image_url={tipo.icono_url}
              className="mb-4"
            />

            <TratamientosTable initialData={TratamientosPorTipo[index]} tipoId={tipo.id}/>

          </div>
        ))}
      </div>
    </main>
  );
};

export default TratamientosPrincipal;