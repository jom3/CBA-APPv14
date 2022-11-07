import { Contactos } from "./Contactos";
import { Datos } from "./Datos";

export interface Proveedores{
  codprov: number;
  coda: Datos[];
  codcon:Contactos[];
  estado:number;
}
