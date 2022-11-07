import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Egresos } from '../../models/Egresos';

@Injectable({
  providedIn: 'root'
})
export class EgresosService {
  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  listarEgresos(): Observable<Egresos[]>{
    return this.http.get<Egresos[]>(`${this.baseUrl}/egresos/listarEgresos`);
  }
  listarEgresosbyProyecto(codpro: number): Observable<Egresos[]>{
    return this.http.get<Egresos[]>(`${this.baseUrl}/egresos/listarEgresosbyProyecto/${codpro}`);
  }
  listarEgreso(codegre: number):Observable<Egresos>{
    return this.http.get<Egresos>(`${this.baseUrl}/egresos/listarEgreso/${codegre}`);
  }
  Egreso(codegre: number):Observable<Egresos>{
    return this.http.get<Egresos>(`${this.baseUrl}/egresos/Egreso/${codegre}`);
  }
  TotalEgresos(codpro: number): Observable<Egresos[]>{
    return this.http.get<Egresos[]>(`${this.baseUrl}/egresos/TotalEgresosBs/${codpro}`);
  }
  registrarEgreso(egreso:Egresos):Observable<Egresos>{
    return this.http.post<Egresos>(`${this.baseUrl}/egresos/registrarEgreso`,egreso)
  }
  modificarEgreso(codegre:number,egreso:Egresos):Observable<Egresos>{
    return this.http.put<Egresos>(`${this.baseUrl}/egresos/modificarEgreso/${codegre}`,egreso)
  }
  eliminarEgreso(codegre:number, codusu:number):Observable<Egresos>{
    return this.http.put<Egresos>(`${this.baseUrl}/egresos/eliminarEgreso/${codegre}`,{codusu})
  }
  restaurarEgreso(codegre:number, codusu:number):Observable<Egresos>{
    return this.http.put<Egresos>(`${this.baseUrl}/egresos/restaurarEgreso/${codegre}`,{codusu})
  }
  confirmarEgreso(codegre:number, codusu:number):Observable<Egresos>{
    return this.http.put<Egresos>(`${this.baseUrl}/egresos/confirmarEgreso/${codegre}`,{codusu})
  }
}
