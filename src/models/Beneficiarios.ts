import { Proyectos } from './Proyectos';
import { Usuarios } from './Usuarios';
import { Personas } from './Personas';
import { Instituciones } from './Instituciones';
export interface Beneficiarios{
  codben: number,
  codpro: Proyectos,
  codper: Personas,
  codi: Instituciones,
  estado: number
}
