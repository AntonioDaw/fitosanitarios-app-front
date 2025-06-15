'use client';

import React from 'react';
import TratamientoForm from './TratamientoForm';

interface FormWrapperProps {
  cultivos: {
    id: number;
    nombre: string;
    tipo_id: number;
  }[];
  productos: {
    id: number;
    nombre: string;
  }[];
  tipos: {
    id: number;
    nombre: string;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (formData: FormData, id?: string) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any
}


export function FormWrapper({ cultivos, productos, tipos, action, initialData }: FormWrapperProps) {



  return (
    <TratamientoForm
      cultivosDisponibles={cultivos}
      productosDisponibles={productos}
      tiposDisponibles={tipos}
      action ={action}
      initialData={initialData} // Asegúrate de pasar la función action correctamente
    />
  );
}
