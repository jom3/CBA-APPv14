import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instituciones } from '../../models/Instituciones';

@Injectable({
  providedIn: 'root'
})
export class InstitucionesService {
  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  listarInstituciones(): Observable<Instituciones[]>{
    return this.http.get<Instituciones[]>(`${this.baseUrl}/instituciones/listarInstituciones`);
  }
  listarInstitucionesActivas(): Observable<Instituciones[]>{
    return this.http.get<Instituciones[]>(`${this.baseUrl}/instituciones/listarInstitucionesActivas`);
  }
  listarInstitucion(codi: number):Observable<Instituciones>{
    return this.http.get<Instituciones>(`${this.baseUrl}/instituciones/listarInstitucion/${codi}`);
  }
  registrarInstitucion(institucion:Instituciones):Observable<Instituciones>{
    return this.http.post<Instituciones>(`${this.baseUrl}/instituciones/registrarInstitucion`,institucion)
  }
  modificarInstitucion(codi:number,institucion:Instituciones):Observable<Instituciones>{
    return this.http.put<Instituciones>(`${this.baseUrl}/instituciones/modificarInstitucion/${codi}`,institucion)
  }
  eliminarInstitucion(codi:number):Observable<Instituciones>{
    return this.http.delete<Instituciones>(`${this.baseUrl}/instituciones/eliminarInstitucion/${codi}`)
  }
  restaurarInstitucion(codi:number):Observable<Instituciones>{
    return this.http.delete<Instituciones>(`${this.baseUrl}/instituciones/restaurarInstitucion/${codi}`)
  }
}
