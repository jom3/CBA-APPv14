import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Miembros } from '../../models/Miembros';

@Injectable({
  providedIn: 'root',
})
export class MiembrosService {
  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}
  listarMiembros(codeq: number): Observable<Miembros[]> {
    return this.http.get<Miembros[]>(
      `${this.baseUrl}/miembros/listarMiembros/${codeq}`
    );
  }
  listarMiembrosbyProyecto(codpro: number): Observable<Miembros[]> {
    return this.http.get<Miembros[]>(
      `${this.baseUrl}/miembros/listarMiembrosbyProyecto/${codpro}`
    );
  }
  listarRolEquipo(codper: number,codeq:number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/miembros/listarRolEquipo/`, {codper,codeq});
  }
  listarRolProyecto(codper: number,codpro:number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/miembros/listarRolProyecto/`, {codper,codpro});
  }
  listarMiembro(codmiem: number): Observable<Miembros> {
    return this.http.get<Miembros>(
      `${this.baseUrl}/miembros/listarMiembro/${codmiem}`
    );
  }
  registrarMiembro(miembro: Miembros): Observable<Miembros> {
    return this.http.post<Miembros>(
      `${this.baseUrl}/miembros/registrarMiembro`,
      miembro
    );
  }
  modificarMiembro(miembro: Miembros, codmiem: number): Observable<Miembros> {
    return this.http.put<Miembros>(
      `${this.baseUrl}/miembros/modificarMiembro/${codmiem}`,
      miembro
    );
  }
  eliminarMiembro(codmiem: number): Observable<Miembros> {
    return this.http.delete<Miembros>(
      `${this.baseUrl}/miembros/eliminarMiembro/${codmiem}`
    );
  }
  restaurarMiembro(codmiem: number): Observable<Miembros> {
    return this.http.delete<Miembros>(
      `${this.baseUrl}/miembros/restaurarMiembro/${codmiem}`
    );
  }
}
