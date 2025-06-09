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
}

export function FormWrapper({ cultivos, productos, tipos }: FormWrapperProps) {



  return (
    <TratamientoForm
      cultivosDisponibles={cultivos}
      productosDisponibles={productos}
      tiposDisponibles={tipos}
      
    />
  );
}
