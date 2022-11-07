import { Contactos } from "./Contactos";

export interface Personas{
  codper: number;
  nombre: string;
  ap:string;
  am:string;
  foto: string;
  fnac: Date;
  ci: number;
  expedido: string;
  codcon: Contactos;
  estado: number;
}
