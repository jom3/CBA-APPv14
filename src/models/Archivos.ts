import { Proyectos } from "./Proyectos";
import { Datos } from './Datos';

export interface Archivos{
  codarc: number,
  codpro: Proyectos,
  archivo: string,
  coda: Datos,
  fsubida: Date,
  estado: number
}
