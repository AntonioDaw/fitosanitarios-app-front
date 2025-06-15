'use client';

import { signOut } from 'next-auth/react';
import { FaPowerOff } from 'react-icons/fa';

const LogoutButton = () => {
  return (
    <button
      onClick={() => {
        console.log("Cliente: Iniciando signOut...");
        signOut({ callbackUrl: '/login' }); // Borra sesión y redirige
      }}
      className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-500 p-3 text-lg text-white font-bold hover:bg-slate-400 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3"
    >
      <FaPowerOff className="w-6" />
      <p className="hidden md:block">Logout</p>
    </button>
  );
};

export default LogoutButton;
