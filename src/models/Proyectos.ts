import { Personas } from './Personas';
import { Instituciones } from './Instituciones';
import { TiposProyecto } from './TiposProyectos';
import { ProductosServicios } from './ProductosServicios';
export interface Proyectos{
  codpro: number,
  titulo: string, //*
  codper: Personas, //*
  codi: Instituciones, //*
  caracter: string, //*
  codtipo: TiposProyecto,
  justificacion: string, //*
  objetivo: string, //*
  codps: ProductosServicios,
  costo: number, //*
  divisa: string, //*
  finicio: Date,
  ffin: Date,
  estado: number
}
