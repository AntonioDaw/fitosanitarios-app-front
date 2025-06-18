'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { FaHome, FaTruckLoading, FaLeaf } from 'react-icons/fa';
import { Biohazard, LandPlot, Shield, SprayCan, Sprout, User, User2Icon, UserCheck } from 'lucide-react';

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
    name: "Usuarios",
    href: "/dashboard/usuarios",
    icon: User,
    color: "text-black"
  },
  
  
  {
    name: "Aplicaciones",
    href: "/dashboard/aplicaciones",
    icon: SprayCan,
    color: "text-yellow-400",
    showEver: true,
  }

];

const NavLinks = () => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;

  return (
    <nav className="flex flex-wrap w-full gap-1 md:flex-col md:gap-2">
      {links.map((linkItem, index) => {
        const LinkIcon = linkItem.icon;

        if (role !== 'admin' && !linkItem.showEver) return null;

        return (
          <Link
            key={index}
            href={linkItem.href}
            className={`
              flex items-center justify-center gap-1
              rounded-md px-2 py-2
              w-1/4 h-10 text-white text-sm font-semibold
              hover:bg-slate-400 hover:text-white

              md:w-full md:h-[48px] md:justify-start md:px-3 md:py-2 md:text-lg
              ${pathName === linkItem.href ? 'bg-slate-500' : 'bg-slate-700'}
            `}
          >
            <LinkIcon className={`${linkItem.color} h-5 w-5 md:h-6 md:w-6`} />
            <span className="hidden md:inline">{linkItem.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};


export default NavLinks;
