'use client';

import React from 'react';


import { CreateParcelaResponse } from '@/app/lib/parcelas/crearParcela';
import ParcelaForm from './ParcelaForm';



interface FormWrapperProps {

  initialValues?: CreateParcelaResponse['values'];
  action: (formData: FormData) => Promise<CreateParcelaResponse>;

}


export function FormWrapper({ action, initialValues }: FormWrapperProps) {



  return (
    <ParcelaForm

      action={action}
      initialData={initialValues}
    />
  );
}