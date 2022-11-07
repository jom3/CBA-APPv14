import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observaciones } from '../../models/Observaciones';

@Injectable({
  providedIn: 'root'
})
export class ObservacionesService {
  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  listarObservaciones(): Observable<Observaciones[]>{
    return this.http.get<Observaciones[]>(`${this.baseUrl}/observaciones/listarObservaciones`);
  }
  listarObservacionesbyProyecto(codpro: number): Observable<Observaciones[]>{
    return this.http.get<Observaciones[]>(`${this.baseUrl}/observaciones/listarObservacionesbyProyecto/${codpro}`);
  }
  listarObservacion(codo: number): Observable<Observaciones[]>{
    return this.http.get<Observaciones[]>(`${this.baseUrl}/observaciones/listarObservacion/${codo}`);
  }
  listarMisObservaciones(codper: number): Observable<Observaciones[]>{
    return this.http.get<Observaciones[]>(`${this.baseUrl}/observaciones/listarMisObservaciones/${codper}`);
  }
  registrarObservacion(ob:Observaciones):Observable<Observaciones>{
    return this.http.post<Observaciones>(`${this.baseUrl}/observaciones/registrarObservacion`,ob)
  }
  modificarObservacion(codo:number,ob:Observaciones):Observable<Observaciones>{
    return this.http.put<Observaciones>(`${this.baseUrl}/observaciones/modificarObservacion/${codo}`,ob)
  }
  eliminarObservacion(codo:number):Observable<Observaciones>{
    return this.http.delete<Observaciones>(`${this.baseUrl}/observaciones/eliminarObservacion/${codo}`)
  }
  bloquearObservacion(codo:number):Observable<Observaciones>{
    return this.http.delete<Observaciones>(`${this.baseUrl}/observaciones/bloquearObservacion/${codo}`)
  }
}
