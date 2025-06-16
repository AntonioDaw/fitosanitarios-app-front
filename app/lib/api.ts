'use server'
import { auth } from "@/auth";
import { Tipo, Sector, Cultivo, Tratamiento, Producto, Parcela, Aplicacion, User} from "../types";
import toast from "react-hot-toast";

/** Obtiene los headers con el token actual del usuario */
export const getHeaders = async () => {
  const session = await auth();
  const token = session?.user?.token ?? "";
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
};

/** Wrapper genérico para fetch con autenticación */
export const fetchWithAuth = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const headers = await getHeaders();
  return fetch(input, {
    ...init,
    headers: {
      ...headers,
      ...(init?.headers || {}),
    },
  });
};

// ─── TIPOS ──────────────────────────────────────────────

export const fetchTipos = async (): Promise<Tipo[]> => {
  try {
    const response = await fetchWithAuth(`http://localhost/api/tipos`);
    const result = await response.json();
    return result.data as Tipo[];
  } catch (error) {
    console.error('Error al obtener los tipos:', error);
    return [];
  }
};

export const fetchTableData = async (tipoId: number): Promise<Sector[]> => {
  try {
    const response = await fetchWithAuth(`http://localhost/api/sectores/cultivos/${tipoId}`);
    const result = await response.json();
    return result.data as Sector[];
  } catch (error) {
    console.error('Error al obtener sectores:', error);
    return [];
  }
};


export const fetchTableCultivo = async (query?: string, currentPage?: number) => {
  try {
    let url = `http://localhost/api/cultivos`;
    const params = new URLSearchParams();
    if (query) params.append('search', query);
    if (currentPage) params.append('page', currentPage.toString());
    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetchWithAuth(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error al obtener los cultivos:', error);
    return [];
  }
};

export const fetchCultivo = async (id: number): Promise<Cultivo | null> => {
  try {
    const response = await fetchWithAuth(`http://localhost/api/cultivos/${id}`);
    const result = await response.json();
    return result.data as Cultivo;
  } catch (error) {
    console.error('Error al obtener el cultivo:', error);
    return null;
  }
};

export const deleteCultivo = async (id: number) => {
  try {
    await fetchWithAuth(`http://localhost/api/cultivos/${id}`, { method: 'DELETE' });
  } catch (error) {
    console.error('Error al borrar el cultivo:', error);
  }
};

export const deleteTratamiento = async (id: number) => {
  try {
    await fetchWithAuth(`http://localhost/api/tratamientos/${id}`, { method: 'DELETE' });
  } catch (error) {
    console.error('Error al borrar el tratamiento:', error);
  }
};

export const deleteProducto = async (id: number) => {
  try {
    await fetchWithAuth(`http://localhost/api/productos/${id}`, { method: 'DELETE' });
  } catch (error) {
    console.error('Error al borrar el producto:', error);
  }
};

export const deleteParcela = async (id: number) => {
  try {
    await fetchWithAuth(`http://localhost/api/parcelas/${id}`, { method: 'DELETE' });
  } catch (error) {
    console.error('Error al borrar la parcela:', error);
  }
};

export const deleteSector = async (id: number) => {
  try {
    await fetchWithAuth(`http://localhost/api/sectors/${id}`, { method: 'DELETE' });
  } catch (error) {
    console.error('Error al borrar el sector:', error);
  }
};

export const deleteAplicacion = async (id: number) => {
  try {
    await fetchWithAuth(`http://localhost/api/aplicaciones/${id}`, { method: 'DELETE' });
  } catch (error) {
    console.error('Error al borrar la aplicación:', error);
  }
};

export const deleteUsuario = async (id: number) => {
  const session = await auth();
  const Userid = session?.user?.id;
  if (Number(Userid) !== id) {
    try {
      await fetchWithAuth(`http://localhost/api/usuarios/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Error al borrar usuario:', error);
    }
  }else{
     toast.error('No puedes eliminar tu propio usuario');
  }
};


export const plantarCultivo = async (cultivoId: number, sectorId: number) => {
  const headers = await getHeaders();
  try {
    const response = await fetch(`http://localhost/api/cultivos/plantar/${cultivoId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ sector_id: sectorId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al plantar cultivo');
    }

    const data = await response.json();
    console.log('Éxito:', data.message);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error:', error.message);
    throw error;
  }

}

export const fetchCultivosTipos = async (tipoId: number) => {
  try {
    const response = await fetchWithAuth(`http://localhost/api/tipos/${tipoId}/cultivos`);
    const result = await response.json();
    return result.data as Cultivo[];
  } catch (error) {
    console.error('Error al obtener los cultivos por tipo:', error);
    return [];
  }
};

export const fetchSectoresVacios = async () => {
  try {
    const response = await fetchWithAuth(`http://localhost/api/sectores/vacios`);
    const result = await response.json();
    return result.data as Sector[];
  } catch (error) {
    console.error('Error al obtener sectores vacíos:', error);
    return [];
  }
};

export const fetchTratamientosTipo = async (tipoId: number): Promise<Tratamiento[]> => {
  try {
    const response = await fetchWithAuth(`http://localhost/api/tratamientos/tipo/${tipoId}`);
    const result = await response.json();
    return result.data as Tratamiento[];
  } catch (error) {
    console.error('Error al obtener los tratamientos por tipo:', error);
    return [];
  }
};

export const cambiarEstado = async (Id: number) => {
  try {
    await fetchWithAuth(`http://localhost/api/tratamientos/${Id}/avanzar`, {
      method: 'POST',
    });
  } catch (error) {
    console.error('Error al avanzar estado del tratamiento:', error);
  }
};

export const fetchTratamiento = async (Id: number): Promise<Tratamiento> => {
  try {
    const response = await fetchWithAuth(`http://localhost/api/tratamientos/${Id}`);
    const result = await response.json();
    return result as Tratamiento;
  } catch (error) {
    console.error('Error al obtener tratamiento:', error);
    return {} as Tratamiento;
  }
};

export const fetchTratamientos = async () => {
  try {
    const response = await fetchWithAuth(`http://localhost/api/tratamientos`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error al obtener tratamientos:', error);
    return [];
  }
};

export const fetchCultivos = async () => {
  try {
    const response = await fetchWithAuth(`http://localhost/api/listacultivos`);
    const result = await response.json();
    return result.data as Cultivo[];
  } catch (error) {
    console.error('Error al obtener cultivos:', error);
    return [];
  }
};

export const fetchProductos = async () => {
  try {
    const response = await fetchWithAuth(`http://localhost/api/listaproductos`);
    const result = await response.json();
    return result.data as Producto[];
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};

export const fetchProducto = async (Id: number): Promise<Producto> => {
  try {
    const response = await fetchWithAuth(`http://localhost/api/productos/${Id}`);
    const result = await response.json();
    return result as Producto;
  } catch (error) {
    console.error('Error al obtener producto:', error);
    return {} as Producto;
  }
};

export const fetchParcela = async (Id: number): Promise<Parcela> => {
  try {
    const response = await fetchWithAuth(`http://localhost/api/parcelas/${Id}`);
    const result = await response.json();
    return result.data as Parcela;
  } catch (error) {
    console.error('Error al obtener parcela:', error);
    return {} as Parcela;
  }
};

export const fetchParcelas = async () => {
  try {
    const response = await fetchWithAuth(`http://localhost/api/parcelas`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error al obtener parcelas:', error);
    return [];
  }
};

export const fetchAplicacion = async (Id: number): Promise<Aplicacion> => {
  try {
    const response = await fetchWithAuth(`http://localhost/api/aplicaciones/${Id}`);
    const result = await response.json();
    return result as Aplicacion;
  } catch (error) {
    console.error('Error al obtener aplicación:', error);
    return {} as Aplicacion;
  }
};

export const fetchTratamientosForm = async (): Promise<Tratamiento[]> => {
  try {
    const response = await fetchWithAuth(`http://localhost/api/tratamientos/form`);
    const result = await response.json();
    return result.data as Tratamiento[];
  } catch (error) {
    console.error('Error al obtener tratamientos para formulario:', error);
    return [];
  }
};

export const fetchSectoresPorTipo = async (tipo_id: number) => {
  const headers = await getHeaders();

  const res = await fetch(`http://localhost/api/sectores/cultivos/${tipo_id}`, {
    method: 'GET',
    headers,
  });

  if (!res.ok) {
    throw new Error('Error cargando sectores');
  }

  const data = await res.json();
  return data.data; 
};

export async function accionAplicacion(id: number, accion: 'aprobar' | 'rechazar') {
  const headers = await getHeaders();
  const url = `http://localhost/api/aplicaciones/${accion}/${id}`;

  const res = await fetch(url, { method: 'POST',headers });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Error al ${accion} la aplicación`);
  }

  return await res.json();
}

export const fetchTableUsers = async (query?: string, currentPage?: number) => {
  try {
const headers = await getHeaders()
    let url = `http://localhost/api/usuarios`;
    console.log(url);
    const params = new URLSearchParams();

    if (query) params.append('search', query);
    if (currentPage) params.append('page', currentPage.toString());

    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    const response = await fetch(url, {
      method: 'GET',
      headers
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
};

export const fetchUsuario = async (Id: number): Promise<User> => {
  try {
    const response = await fetchWithAuth(`http://localhost/api/usuarios/${Id}`);
    const result = await response.json();
    return result.data as User;
  } catch (error) {
    console.error('Error al obtener parcela:', error);
    return {} as User;
  }
};