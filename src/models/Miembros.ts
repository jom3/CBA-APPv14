import { Personal } from './Personal';
import { Roles } from './Roles';
import { Equipos } from './equipos';
export interface Miembros{
  codmiem: number,
  codper: Personal,
  codrol: Roles,
  codeq: Equipos,
  estado: number
}
