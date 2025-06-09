import { Tipo, Sector, Cultivo, Tratamiento, Producto } from "../types";



export const fetchTipos = async ():Promise<Tipo[]> => {
  try {
    const response = await fetch("http://192.168.0.17/api/tipos", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

     return result.data as Tipo[];
  } catch (error) {
    console.error('Error al obtener los tipos:', error);
    return [];
  }
};

export const fetchTableData = async (tipoId: number): Promise<Sector[]> => {
  try {
    const response = await fetch(`http://192.168.0.17/api/sectores/cultivos/${tipoId}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    });
    const result = await response.json();
    return result.data as Sector[];
  } catch (error) {
    console.error('Error al obtener los sectores:', error);
    return [];
  }
};



export const fetchTableCultivo = async (query?: string, currentPage?: number) => {
  try {
    // Construir la URL dinámicamente
    let url = 'http://192.168.0.17/api/cultivos';
    const params = new URLSearchParams();

    if (query) params.append('search', query);
    if (currentPage) params.append('page', currentPage.toString());

    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error al obtener los cultivos:', error);
    return [];
  }
};

export const fetchCultivo = async (id: number) => {
  try {
    // Construir la URL dinámicamente
    const url = `http://192.168.0.17/api/cultivos/${id}`;



    const response = await fetch(url, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error al obtener el cultivo:', error);
    return [];
  }
};

export const deleteCultivo = async (id: number) => {
  try {
    // Construir la URL dinámicamente
    const url = `http://192.168.0.17/api/cultivos/${id}`;



    await fetch(url, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error('Error al obtener el cultivo:', error);
    return [];
  }

};
export const deleteTratamiento = async (id: number) => {
  try {
    // Construir la URL dinámicamente
    const url = `http://192.168.0.17/api/tratamientos/${id}`;



    await fetch(url, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error('Error al obtener el taratmiento:', error);
    return [];
  }

};
export const plantarCultivo = async (cultivoId: number, sectorId: number) => {
  try {
    const response = await fetch(`/api/cultivos/${cultivoId}/plantar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
    const response = await fetch(`http://192.168.0.17/api/tipos/${tipoId}/cultivos`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    });
    const result = await response.json();
    return result.data as Cultivo[];
  } catch (error) {
    console.error('Error al obtener los cultivos:', error);
    return [];
  }
};

export const fetchSectoresVacios = async () => {
  try {
    const response = await fetch('http://192.168.0.17/api/sectores/vacios', {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    });
    const result = await response.json();
    return result.data as Sector[];
  } catch (error) {
    console.error('Error al obtener los cultivos:', error);
    return [];
  }
};

export const fetchTratamientosTipo = async (tipoId: number): Promise<Tratamiento[]> => {
  try {
    const response = await fetch(`http://192.168.0.17/api/tratamientos/tipo/${tipoId}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    });
    const result = await response.json();
    return result.data as Tratamiento[];
  } catch (error) {
    console.error('Error al obtener los tratamientos:', error);
    return [];
  }
};

export const cambiarEstado = async (Id:number) => {
 try {
    await fetch(`http://192.168.0.17/api/tratamientos/${Id}/avanzar`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error('Error al avanzar:', error);
    return [];
  }
};

export const fetchTratamiento = async (Id: number): Promise<Tratamiento> => {
  try {
    const response = await fetch(`http://192.168.0.17/api/tratamientos/${Id}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    });
    const result = await response.json();
    return result as Tratamiento;
  } catch (error) {
    console.error('Error al obtener tratamiento:', error);
    return {} as Tratamiento;
  }
};

export const fetchCultivos = async () => {
  try {
    const response = await fetch("http://192.168.0.17/api/listacultivos", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });
   const result = await response.json();
    return result.data as Cultivo[];
  } catch (error) {
    console.error('Error al obtener los cultivos:', error);
    return [];
  }
};

export const fetchProductos = async () => {
  try {
    const response = await fetch("http://192.168.0.17/api/listaproductos", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });
   const result = await response.json();
    return result.data as Producto[];
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return [];
  }
};


