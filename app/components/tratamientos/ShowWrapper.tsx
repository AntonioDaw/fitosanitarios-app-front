
'use client';

import { useRouter } from 'next/navigation';
import TratamientoShow from './TratamientoShow';
import { Tratamiento } from '@/app/types';
import { deleteTratamiento } from '@/app/lib/api';



interface TratamientoShowWrapperProps {
  tratamiento: Tratamiento;
}

export default function TratamientoShowWrapper({ tratamiento }: TratamientoShowWrapperProps) {
  const router = useRouter();

  const onDelete = async (id: number) => {
    await deleteTratamiento(id);

    router.push('/dashboard/tratamientos');
  };

  return <TratamientoShow tratamiento={tratamiento} onDelete={onDelete} />;
}
