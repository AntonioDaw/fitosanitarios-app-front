'use client'
import Link from 'next/link';
import { FaHome, FaBriefcase, FaUsers, FaBlackberry } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
const links = [{
    name: "Dashboard",
    href: "/dashboard",
    icon: FaHome

},
{
    name: "Usuarios",
    href: "/dashboard/usuarios",
    icon: FaBriefcase

},
{
    name: "Clientes",
    href: "/dashboard/clientes",
    icon: FaUsers

},
{
    name: "Cultivos",
    href: "/dashboard/cultivos",
    icon: FaBlackberry

},
]

const NavLinks = () => {
    const pathName = usePathname();
    return (
        <>
            {links.map((x, index) => {
                const LinkIcon = x.icon;
                return (
                    <Link
                        key={index}
                        href={x.href}
                        className={`flex h-[48px] grow items-center justify-center gap-2
            rounded-md  p-3 text-lg text-white font-bold hover:bg-slate-400 hover:text-white 
            md:flex-none md:justify-start md:p-2 md:px-3 ${pathName === x.href ? 'bg-slate-500' : 'bg-slate-700'}`}
                    >
                        <LinkIcon />
                        <p className='hidden md:block'>{x.name}</p>
                    </Link>
                );
            })}
        </>
    )
}

export default NavLinks