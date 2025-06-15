import { UnidadProducto } from "../lib/data";

export interface Parcela {
  id: number | string;
  numero_parcela: string | number;
  nombre: string;
  n_sectores: number;
  sectors: Sector[];
}

export interface Sector {
  id: number;
  numero_sector: string | number;
  parcela_nombre: string;
  numero_parcela: string | number;
  esta_plantado: boolean;
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
  unidad_productos:UnidadProducto[]
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
    unidad_productos:UnidadProducto[]
  }[];
  created_at: string;
  estado: number;
}

export interface Tipo {
  id: number;
  nombre: string;
  icono_url: string;
}

export interface Proveedor {
  id: number;
  nombre: string;
  nif: string,
  direccion: string,
  telefono: string
  email: string
  contacto: string
  estado: string
}

export interface Aplicacion {
  id: number;
  user: {
    id: number;
    nombre: string;
  };
  tratamiento: {
    id: number;
    descripcion: string;
  };
  litros: number; 
  gasto_por_producto: GastoPorProducto[];
  sectores: SectorAplicado[];
  unidades_producto: UnidadProductoAplicada[];
  created_at: string; // o Date si haces parseo
  estado: 'provisional' | 'confirmado' | string;
}

export interface GastoPorProducto {
  nombre: string;
  cantidad: number;
  producto_id: number;
}

export interface SectorAplicado {
  id: number;
  numero_sector: number;
  litros_aplicados: number;
  parcela_nombre: string
}

export interface UnidadProductoAplicada {
  id: number;
  producto: {
    id: number;
    nombre: string;
  };
}