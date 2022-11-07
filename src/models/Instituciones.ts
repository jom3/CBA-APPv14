import { Datos } from './Datos';
import { Contactos } from './Contactos';
export interface Instituciones{
  codi: number;
  coda: Datos[];
  codcon:Contactos[];
  estado:number;
}
