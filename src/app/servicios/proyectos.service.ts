import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyectos } from '../../models/Proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  listarProyectos(): Observable<Proyectos[]>{
    return this.http.get<Proyectos[]>(`${this.baseUrl}/proyectos/listarProyectos`);
  }
  listarProyectosActivos(): Observable<Proyectos[]>{
    return this.http.get<Proyectos[]>(`${this.baseUrl}/proyectos/listarProyectosActivos`);
  }
  listarProyectosInactivos(): Observable<Proyectos[]>{
    return this.http.get<Proyectos[]>(`${this.baseUrl}/proyectos/listarProyectosInactivos`);
  }
  listarProyectosPublicos(): Observable<Proyectos[]>{
    return this.http.get<Proyectos[]>(`${this.baseUrl}/proyectos/listarProyectosPublicos`);
  }
  listarProyectosbyPersonas(codper:number): Observable<Proyectos[]>{
    return this.http.get<Proyectos[]>(`${this.baseUrl}/proyectos/listarProyectobyPersona/${codper}`)
  }
  listarProyectosbyMiembro(codper:number): Observable<Proyectos[]>{
    return this.http.get<Proyectos[]>(`${this.baseUrl}/proyectos/listarProyectobyMiembro/${codper}`)
  }
  listarProyectobyEquipo(codeq:number): Observable<Proyectos[]>{
    return this.http.get<Proyectos[]>(`${this.baseUrl}/proyectos/listarProyectobyEquipo/${codeq}`)
  }
  listarProyecto(codpro: number):Observable<Proyectos>{
    return this.http.get<Proyectos>(`${this.baseUrl}/proyectos/listarProyecto/${codpro}`);
  }
  listarProyectosInformes(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/proyectos/listarProyectosInformes`);
  }
  listarProyectosInformesbyTipo(codtipo:number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/proyectos/listarProyectosInformesbyTipo/${codtipo}`);
  }
  listarProyectosInformesbyFechas(xfecha:any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/proyectos/listarProyectosInformesbyFechas`,xfecha);
  }
  registrarProyecto(pro:Proyectos):Observable<Proyectos>{
    return this.http.post<Proyectos>(`${this.baseUrl}/proyectos/registrarProyecto`,pro)
  }
  modificarProyecto(codpro:number,pro:Proyectos):Observable<Proyectos>{
    return this.http.put<Proyectos>(`${this.baseUrl}/proyectos/modificarProyecto/${codpro}`,pro)
  }
  planificarProyecto(codpro:number):Observable<Proyectos>{
    return this.http.delete<Proyectos>(`${this.baseUrl}/proyectos/planificarProyecto/${codpro}`)
  }
  ejecutarProyecto(codpro:number):Observable<Proyectos>{
    return this.http.delete<Proyectos>(`${this.baseUrl}/proyectos/ejecutarProyecto/${codpro}`)
  }
  eliminarProyecto(codpro:number):Observable<Proyectos>{
    return this.http.delete<Proyectos>(`${this.baseUrl}/proyectos/eliminarProyecto/${codpro}`)
  }
  restaurarProyecto(codpro:number):Observable<Proyectos>{
    return this.http.delete<Proyectos>(`${this.baseUrl}/proyectos/restaurarProyecto/${codpro}`)
  }
  completarProyecto(codpro:number):Observable<Proyectos>{
    return this.http.delete<Proyectos>(`${this.baseUrl}/proyectos/completarProyecto/${codpro}`)
  }
  aceptarProyecto(codpro:number):Observable<Proyectos>{
    return this.http.delete<Proyectos>(`${this.baseUrl}/proyectos/aceptarProyecto/${codpro}`)
  }
  rechazarProyecto(codpro:number):Observable<Proyectos>{
    return this.http.delete<Proyectos>(`${this.baseUrl}/proyectos/rechazarProyecto/${codpro}`)
  }
}
