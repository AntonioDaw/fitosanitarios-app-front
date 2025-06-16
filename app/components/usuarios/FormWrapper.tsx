'use client';

import React from 'react';




import UsuarioForm from './UsuarioForm';



interface ParcelaFormResponse {
  success: boolean;
  message: string;
  errors: Record<string, string[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: Record<string, any>;
}

interface FormWrapperProps {
  initialValues?: ParcelaFormResponse['values'];
  action: (formData: FormData) => Promise<ParcelaFormResponse>;
}


export function FormWrapper({ action, initialValues }: FormWrapperProps) {



  return (
    <UsuarioForm

      action={action}
      initialData={initialValues}
    />
  );
}