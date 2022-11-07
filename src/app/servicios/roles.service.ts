import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roles } from '../../models/Roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  listarRoles(): Observable<Roles[]>{
    return this.http.get<Roles[]>(`${this.baseUrl}/roles/listarRoles`);
  }
  listarRol(codrol: number):Observable<Roles>{
    return this.http.get<Roles>(`${this.baseUrl}/roles/listarRol/${codrol}`);
  }
  obtenerRol(codper:number):Observable<Roles>{
    return this.http.get<Roles>(`${this.baseUrl}/roles/obtenerRol/${codper}`);
  }
  listarRolProyecto(codper:number,codpro:number):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/roles/listarRolProyecto`,{codper,codpro});
  }
  listarRolbyUsuarios():Observable<Roles[]>{
    return this.http.get<Roles[]>(`${this.baseUrl}/roles/listarRolesbyUsuario`);
  }
  listarRolforPersonal():Observable<Roles[]>{
    return this.http.get<Roles[]>(`${this.baseUrl}/roles/listarRolesforPersonal`);
  }
  listarRolforEquipos():Observable<Roles[]>{
    return this.http.get<Roles[]>(`${this.baseUrl}/roles/listarRolesforEquipos`);
  }
  registrarRol(roles:Roles):Observable<Roles>{
    return this.http.post<Roles>(`${this.baseUrl}/roles/registrarRol`,roles)
  }
  modificarRol(codrol:number,roles:Roles):Observable<Roles>{
    return this.http.put<Roles>(`${this.baseUrl}/roles/modificarRol/${codrol}`,roles)
  }
  eliminarRol(codrol:number):Observable<Roles>{
    return this.http.delete<Roles>(`${this.baseUrl}/roles/eliminarRol/${codrol}`)
  }
  restaurarRol(codrol:number):Observable<Roles>{
    return this.http.delete<Roles>(`${this.baseUrl}/roles/restaurarRol/${codrol}`)
  }
}
