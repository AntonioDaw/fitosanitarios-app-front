export interface Parcela {
  numero_parcela: string | number;
  nombre: string;
}

export interface Sector {
  id: number | string;
  numero_sector: string | number;
  parcela_nombre: string;
}

export interface Cultivo {
  id: number;
  nombre: string;
  icono_url: string;
  tipo: string;
  tipo_id: number;
  esta_plantado: boolean;
}

export const fetchTipos = async () => {
  try {
    const getCultivos = await fetch("http://192.168.0.17/api/tipos", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await getCultivos.json();

    return result.data;
  } catch (error) {
    console.error('Error al obtener los tipos:', error);
    return null;
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