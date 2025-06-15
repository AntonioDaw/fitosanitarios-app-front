'use client';

import React from 'react';
import ProductoForm from './ProductoForm';
import { CreateProductoResponse } from '@/app/lib/productos/crearProducto';



interface FormWrapperProps {

  initialValues?: CreateProductoResponse['values'];
  action: (formData: FormData) => Promise<CreateProductoResponse>;

}


export function FormWrapper({ action, initialValues }: FormWrapperProps) {



  return (
    <ProductoForm

      action={action}
      initialData={initialValues}
    />
  );
}