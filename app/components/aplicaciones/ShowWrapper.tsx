'use client';

import { Aplicacion} from '@/app/types';

import AplicacionShow from './AplicacionShow';




interface AplicacionShowWrapperProps {
  aplicacion: Aplicacion;
}

export default function AplicacionShowWrapper({ aplicacion }: AplicacionShowWrapperProps) {


 

  return <AplicacionShow aplicacion={aplicacion}/>;
}