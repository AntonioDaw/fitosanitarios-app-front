'use client';

import { useEffect, useState } from 'react';
import { fetchProductosForAcquisition, fetchProveedoresForAcquisition } from '@/app/lib/data';
import { Producto, Proveedor } from '@/app/types';
import FormInventario from './FormInventario';
import { AdquisicionResponse } from '@/app/lib/inventario/adquirirProducto';

const initialFormState: AdquisicionResponse = { success: false };

interface FormInventarioProps {
  onSuccess: () => void;
}

export default function FormInventarioWrapper({ onSuccess }: FormInventarioProps) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductosForAcquisition().then((res) => {
      setProductos(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchProveedoresForAcquisition().then((res) => {
      setProveedores(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-center py-4">Cargando formulario...</p>;

  return (
    <FormInventario productos={productos} proveedores={proveedores} initialState={initialFormState} onSuccess={onSuccess} />
  );
}