import { Proyectos } from './Proyectos';
import { Miembros } from './Miembros';
export interface Observaciones{
  codo: number,
  codpro: Proyectos,
  codper: Miembros,
  razon: string,
  codmiem:Miembros,
  estado: number
}
