import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Financiadores } from '../../models/Financiadores';

@Injectable({
  providedIn: 'root'
})
export class FinanciadoresService {
  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  listarFinanciadores(): Observable<Financiadores[]>{
    return this.http.get<Financiadores[]>(`${this.baseUrl}/financiadores/listarFinanciadores`);
  }

  listarFinanciador(codf: number):Observable<Financiadores>{
    return this.http.get<Financiadores>(`${this.baseUrl}/financiadores/listarFinanciador/${codf}`);
  }
  registrarFinanciador(financiador:Financiadores):Observable<Financiadores>{
    return this.http.post<Financiadores>(`${this.baseUrl}/financiadores/registrarFinanciador`,financiador)
  }
  modificarFinanciador(codf:number,financiador:Financiadores):Observable<Financiadores>{
    return this.http.put<Financiadores>(`${this.baseUrl}/financiadores/modificarFinanciador/${codf}`,financiador)
  }
  eliminarFinanciador(codf:number):Observable<Financiadores>{
    return this.http.delete<Financiadores>(`${this.baseUrl}/financiadores/eliminarFinanciador/${codf}`)
  }
  restaurarFinanciador(codf:number):Observable<Financiadores>{
    return this.http.delete<Financiadores>(`${this.baseUrl}/financiadores/restaurarFinanciador/${codf}`)
  }
}
