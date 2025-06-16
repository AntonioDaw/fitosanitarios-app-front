'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { FaHome, FaTruckLoading, FaLeaf } from 'react-icons/fa';
import { Biohazard, LandPlot, Shield, SprayCan, Sprout, User } from 'lucide-react';

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: FaHome,
    color: "text-blue-300"
  },
  {
    name: "Parcelas",
    href: "/dashboard/parcelas",
    icon: LandPlot,
    color: "text-yellow-400"
  },
    {
    name: "Cultivos",
    href: "/dashboard/cultivos",
    icon: FaLeaf,
    color: "text-green-400"
  },
  {
    name: "Plantar",
    href: "/dashboard/cultivos/plantar",
    icon: Sprout,
    color: "text-lime-400"
  },
  {
    name: "Productos",
    href: "/dashboard/productos",
    icon: Biohazard,
    color: "text-orange-400"
  },
  {
    name: "Tratamientos",
    href: "/dashboard/tratamientos",
    icon: Shield,
    color: "text-sky-400"
  },
    {
    name: "Inventario",
    href: "/dashboard/inventario",
    icon: FaTruckLoading,
    color: "text-black"
  },
  
  {
    name: "Aplicaciones",
    href: "/dashboard/aplicaciones",
    icon: SprayCan,
    color: "text-yellow-400",
    showEver: true,
  },
  {
    name: "Usuarios",
    href: "/dashboard/usuarios",
    icon: User,
    color: "text-yellow-400",
    showEver: true,
  }

];

const NavLinks = () => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;
  

  return (
    <>
      {links.map((linkItem, index) => {
        const LinkIcon = linkItem.icon;

        
        if (role !== 'admin' && !linkItem.showEver) return null;

        
        

        return (
          <Link
            key={index}
            href={linkItem.href}
            className={`flex h-[48px] grow items-center justify-center gap-2
              rounded-md p-3 text-lg text-white font-bold hover:bg-slate-400 hover:text-white
              md:flex-none md:justify-start md:p-2 md:px-3 ${pathName === linkItem.href ? 'bg-slate-500' : 'bg-slate-700'}`}
          >
            <LinkIcon className={`h-6 w-6 ${linkItem.color}`} />
            <p className='hidden md:block'>{linkItem.name}</p>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
