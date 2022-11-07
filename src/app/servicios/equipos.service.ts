import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipos } from '../../models/equipos';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  listarEquipos(): Observable<Equipos[]>{
    return this.http.get<Equipos[]>(`${this.baseUrl}/equipos/listarEquipos`);
  }
  listarEquipo(codeq: number):Observable<Equipos>{
    return this.http.get<Equipos>(`${this.baseUrl}/equipos/listarEquipo/${codeq}`);
  }
  listarEquiposbyPersonal(codper: number):Observable<Equipos>{
    return this.http.get<Equipos>(`${this.baseUrl}/equipos/listarEquiposbyPersonal/${codper}`);
  }
}
