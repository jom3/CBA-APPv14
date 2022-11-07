import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficiarios } from '../../models/Beneficiarios';

@Injectable({
  providedIn: 'root'
})
export class BeneficiariosService {
  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  listarBeneficiarios(): Observable<Beneficiarios[]>{
    return this.http.get<Beneficiarios[]>(`${this.baseUrl}/beneficiarios/listarBeneficiarios`);
  }
  listarBeneficiariosbyProyecto(codpro: number): Observable<Beneficiarios[]>{
    return this.http.get<Beneficiarios[]>(`${this.baseUrl}/beneficiarios/listarBeneficiariosbyProyecto/${codpro}`);
  }
  listarPostulaciones(codper: number): Observable<Beneficiarios[]>{
    return this.http.get<Beneficiarios[]>(`${this.baseUrl}/beneficiarios/listarPostulaciones/${codper}`);
  }
  listarBeneficiario(codben: number):Observable<Beneficiarios>{
    return this.http.get<Beneficiarios>(`${this.baseUrl}/beneficiarios/listarBeneficiario/${codben}`);
  }
  registrarBeneficiario(ben:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/beneficiarios/registrarBeneficiario`,ben)
  }
  habilitarBeneficiario(codben:number):Observable<Beneficiarios>{
    return this.http.delete<Beneficiarios>(`${this.baseUrl}/beneficiarios/habilitarBeneficiario/${codben}`)
  }
  deshabilitarBeneficiario(codben:number):Observable<Beneficiarios>{
    return this.http.delete<Beneficiarios>(`${this.baseUrl}/beneficiarios/deshabilitarBeneficiario/${codben}`)
  }
}
