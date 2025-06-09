export interface Parcela {
  numero_parcela: string | number;
  nombre: string;
}

export interface Sector {
  id: number | string;
  numero_sector: string | number;
  parcela_nombre: string;
  numero_parcela: string | number;
}

export interface Cultivo {
  id: number;
  nombre: string;
  icono_url: string;
  tipo: string;
  tipo_id: number;
  esta_plantado: boolean;
}

export interface Producto {
  id: number;
  nombre: string;
  sustancia_activa: string;
  presentacion: string;
  uso: string;
  precio: number;
  estado: boolean;
  cantidad_por_100_litros: number | null;
  created_at: string;
  updated_at: string; 
}

export interface Tratamiento {
  id: number;
  tipo: {
    id: number,
    nombre: string
    icono_url: string
  };
  descripcion: string;
  cultivos: {
    id: number;
    nombre: string;
  }[];
  productos: {
    id: number;
    nombre: string;
    cantidad_por_100_litros: string;
  }[];
  created_at: string;
  estado: number;
}

export interface Tipo {
  id: number;
  nombre: string;
  icono_url: string;
}