import InfoCard from '@/app/components/InfoCard';
import SectoresTable from '@/app/components/SectoresTable';
import {fetchTableData, fetchTipos } from '@/app/lib/api';
import { bebas_Neue } from '@/app/ui/fonts';





const Dashboard = async () => {
  const cultivos = await fetchTipos();
  const sectoresPorCultivo = await Promise.all(
    cultivos.map((cultivo: { id: number; }) => fetchTableData(cultivo.id))
  );

  return (
    <main>
      <h1 className={`${bebas_Neue}.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cultivos.map((cultivo: { id: React.Key | null | undefined; nombre: string; icono_url: string; }, index:number) => (
          <div key={cultivo.id} className="flex flex-col">
            <InfoCard
              title={cultivo.nombre}
              image_url={cultivo.icono_url}
              className="mb-4"
            />
 
            <SectoresTable sectores={sectoresPorCultivo[index]} />
 
          </div>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;