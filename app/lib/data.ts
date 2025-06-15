'use server'
import { signIn } from "@/auth";
import { Producto, Proveedor } from "../types";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { fetchWithAuth } from "./api";
 // Ajusta la ruta al archivo con fetchWithAuth

export interface UnidadProducto {
  id: number;
  codigo_interno: string;
  producto:{
    id: number;
    nombre: string;
  }
  proveedor: {
    id: number;
    nombre: string;
  }
  fecha_ingreso: string;
  estado: number;
}

// Función para obtener la lista de productos para el dropdown
export async function fetchProductosForAcquisition(): Promise<Producto[]> {
  try {
    const res = await fetchWithAuth(`http://localhost/api/listaproductos`);
    if (!res.ok) {
      console.error(`Error al obtener productos: ${res.status} ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    return data.data; // Asumiendo que la API devuelve { data: [...] }
  } catch (error) {
    console.error('Error al obtener productos para adquisición:', error);
    return [];
  }
}

export async function fetchProveedoresForAcquisition(): Promise<Proveedor[]> {
  try {
    const res = await fetchWithAuth(`http://localhost/api/proveedores`);
    if (!res.ok) {
      console.error(`Error al obtener proveedores: ${res.status} ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error al obtener proveedores para adquisición:', error);
    return [];
  }
}

// Función para obtener las unidades de producto paginadas
export const fetchUnidadProductos = async (currentPage?: number, perPage: number = 10) => {
  try {
    let url = `http://localhost/api/unidadproductos`;
    const params = new URLSearchParams();
    if (currentPage) params.append('page', currentPage.toString());
    params.append('per_page', perPage.toString());
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    const response = await fetchWithAuth(url);
    const result = await response.json();

    return {
      data: result.data,
      totalPages: result.pagination.last_page,
      currentPage: result.pagination.current_page,
    };
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return { data: [], totalPages: 1, currentPage: 1 };
  }
};

export const fetchAplicaciones = async (currentPage?: number, perPage: number = 10) => {
  try {
    let url = `http://localhost/api/aplicaciones`;
    const params = new URLSearchParams();
    if (currentPage) params.append('page', currentPage.toString());
    params.append('per_page', perPage.toString());
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    const response = await fetchWithAuth(url);
    const result = await response.json();

    return {
      data: result.data,
      totalPages: result.pagination.last_page,
      currentPage: result.pagination.current_page,
    };
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return { data: [], totalPages: 1, currentPage: 1 };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authenticate = async (state: string | undefined, formData: Record<string, any>) => {
  const callbackUrl = formData.get('callbackUrl') as string || '/dashboard'; 
  try{
    await signIn('credentials', formData)
    revalidatePath(callbackUrl);
    redirect(callbackUrl);
  } catch (error) {
    if(error instanceof AuthError){
      switch (error.type){
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong'
      }
    }
    throw error;
  }
}


