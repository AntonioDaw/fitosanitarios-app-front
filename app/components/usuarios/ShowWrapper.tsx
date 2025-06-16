'use client';

import { useRouter } from 'next/navigation';


import { deleteParcela } from '@/app/lib/api';
import UserShow from './UserShow';
import { User } from '@/app/types';




interface UserShowWrapperProps {
  user: User;
}

export default function UsuarioShowWrapper({ user }: UserShowWrapperProps) {
  const router = useRouter();

  const onDelete = async () => {
    await deleteParcela(user.id);

    router.push('/dashboard/usuarios');
  };

  return <UserShow user={user} onDelete={onDelete} />;
}