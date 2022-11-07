import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TiposProyecto } from '../../models/TiposProyectos';

@Injectable({
  providedIn: 'root'
})
export class TiposProyectosService {
  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  listarTipos(): Observable<TiposProyecto[]>{
    return this.http.get<TiposProyecto[]>(`${this.baseUrl}/tipos/listarTipos`);
  }
  listarTipo(codtipo:number): Observable<TiposProyecto>{
    return this.http.get<TiposProyecto>(`${this.baseUrl}/tipos/listarTipo/${codtipo}`);
  }
  registrarTipo(tipo:TiposProyecto):Observable<TiposProyecto>{
    return this.http.post<TiposProyecto>(`${this.baseUrl}/tipos/registrarTipo`,tipo)
  }
  modificarTipo(codtipo:number,tipo:TiposProyecto):Observable<TiposProyecto>{
    return this.http.put<TiposProyecto>(`${this.baseUrl}/tipos/modificarTipo/${codtipo}`,tipo)
  }
  eliminarTipo(codtipo:number):Observable<TiposProyecto>{
    return this.http.delete<TiposProyecto>(`${this.baseUrl}/tipos/eliminarTipo/${codtipo}`)
  }
  restaurarTipo(codtipo:number):Observable<TiposProyecto>{
    return this.http.delete<TiposProyecto>(`${this.baseUrl}/tipos/restaurarTipo/${codtipo}`)
  }
}
