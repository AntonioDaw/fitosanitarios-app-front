'use server'
import { getHeaders } from "../api";

export const fetchTableParcela = async (query?: string, currentPage?: number) => {
  try {
const headers = await getHeaders()
    let url = `http://localhost/api/parcelas`;
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
    console.error('Error al obtener las parcelas:', error);
    return [];
  }
};



