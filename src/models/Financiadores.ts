import { Personas } from './Personas';
import { Instituciones } from './Instituciones';
export interface Financiadores{
  codf:   number;
  codper: Personas;
  codi:   Instituciones;
  estado: number;
}
