'use client'
import { GiFarmTractor } from "react-icons/gi";
import { bebas_Neue } from "../ui/fonts";
import { useSession } from "next-auth/react";

const Logo = () => {
  const { data: session, status } = useSession();

  // Loading state
  if (status === 'loading') {
    return (
      // Added 'justify-between' here
      <div className={`${bebas_Neue.className} flex flex-row items-center justify-between leading-none text-white w-full`}>
        <div>
          <p className="text-2xl font-semibold">Cargando...</p>
          <p className="text-sm italic">Obteniendo datos de usuario</p>
        </div>
        <GiFarmTractor className="h-36 w-36 text-gray-400 animate-pulse" />
      </div>
    );
  }

  // Loaded state
  const user = session?.user;

  return (
    // Added 'justify-between' here
    <div className={`${bebas_Neue.className} flex flex-row items-center justify-between leading-none text-white w-full`}>
      <div>
        <p className="text-2xl font-semibold">{user?.name || "Invitado"}</p>
        <p className="text-sm italic">{user?.role || "Sin rol"}</p>
      </div>
      <GiFarmTractor
        className={`hidden sm:block text-green-600 'text-gray-400 animate-pulse' : ''} w-24 h-24 sm:w-28 sm:h-28`}
      />
    </div>
  );
};

export default Logo;