export interface Parcela {
  numero_parcela: string | number;
  nombre: string;
}

export interface Sector {
  id: number | string;
  numero_sector: string | number;
  parcela: Parcela;
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