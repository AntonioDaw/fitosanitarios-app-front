import ShowWrapper from '@/app/components/usuarios/ShowWrapper';
import { fetchUsuario } from '@/app/lib/api';
import { bebas_Neue } from '@/app/ui/fonts';
import { Breadcrumbs } from 'anjrot-components';
import { redirect } from 'next/navigation';

type PageProps = {
  params: { id: number };
};



const UsuariosShow = async ({ params }: PageProps) => {
  const { id } = params;
  const breadCrumbs = [
    { label: "Usuarios", href: "/dashboard/usuarios" },
    { label: "Mostrar usuario", href: `/dashboard/usuarios/${id}/mostrar`, active: true }

  ];
  const usuario = await fetchUsuario(params.id);
  if (!usuario.id) {
    redirect('/dashboard/usuarios');
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumb={breadCrumbs}
        className={`${bebas_Neue.className} mb-6`}
      />
      <ShowWrapper user={usuario} />
    </main>
  );
};

export default UsuariosShow;