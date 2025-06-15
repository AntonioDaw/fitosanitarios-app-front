'use client';

import { useRouter } from 'next/navigation';

import { Parcela} from '@/app/types';
import { deleteParcela } from '@/app/lib/api';
import ParcelaShow from './ParcelaShow';



interface ParcelaShowWrapperProps {
  parcela: Parcela;
}

export default function ParcelaShowWrapper({ parcela }: ParcelaShowWrapperProps) {
  const router = useRouter();

  const onDelete = async (id: number) => {
    await deleteParcela(id);

    router.push('/dashboard/parcelas');
  };

  return <ParcelaShow parcela={parcela} onDelete={onDelete} />;
}