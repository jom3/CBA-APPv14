import { Ingresos } from './../../models/Ingresos';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {
  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  listarIngresos(): Observable<Ingresos[]>{
    return this.http.get<Ingresos[]>(`${this.baseUrl}/ingresos/listarIngresos`);
  }
  listarIngresosbyProyecto(codpro: number): Observable<Ingresos[]>{
    return this.http.get<Ingresos[]>(`${this.baseUrl}/ingresos/listarIngresosbyProyecto/${codpro}`);
  }
  TotalIngresos(codpro: number): Observable<Ingresos[]>{
    return this.http.get<Ingresos[]>(`${this.baseUrl}/ingresos/TotalIngresos/${codpro}`);
  }
  listarIngreso(coding: number):Observable<Ingresos>{
    return this.http.get<Ingresos>(`${this.baseUrl}/ingresos/listarIngreso/${coding}`);
  }
  listarTotal(codpro:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/ingresos/listarTodo/${codpro}`);
  }
  Ingreso(coding: number):Observable<Ingresos>{
    return this.http.get<Ingresos>(`${this.baseUrl}/ingresos/Ingreso/${coding}`);
  }
  registrarIngreso(ingreso:Ingresos):Observable<Ingresos>{
    return this.http.post<Ingresos>(`${this.baseUrl}/ingresos/registrarIngreso`,ingreso)
  }
  modificarIngreso(coding:number,ingreso:Ingresos):Observable<Ingresos>{
    return this.http.put<Ingresos>(`${this.baseUrl}/ingresos/modificarIngreso/${coding}`,ingreso)
  }
  eliminarIngreso(coding:number,codper:number):Observable<Ingresos>{
    return this.http.put<Ingresos>(`${this.baseUrl}/ingresos/eliminarIngreso/${coding}`,{codper})
  }
  restaurarIngreso(coding:number,codper:number):Observable<Ingresos>{
    return this.http.put<Ingresos>(`${this.baseUrl}/ingresos/restaurarIngreso/${coding}`,{codper})
  }
  confirmarIngreso(coding:number,codper:number):Observable<Ingresos>{
    return this.http.put<Ingresos>(`${this.baseUrl}/ingresos/confirmarIngreso/${coding}`,{codper})
  }
}
