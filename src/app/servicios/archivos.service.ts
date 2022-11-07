import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Archivos } from '../../models/Archivos';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {
  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  listarArchivos(): Observable<Archivos[]>{
    return this.http.get<Archivos[]>(`${this.baseUrl}/archivos/listarArchivos`);
  }
  listarArchivosbyProyecto(codpro: number): Observable<Archivos[]>{
    return this.http.get<Archivos[]>(`${this.baseUrl}/archivos/listarArchivosbyProyecto/${codpro}`);
  }
  listarArchivo(codarc: number):Observable<Archivos>{
    return this.http.get<Archivos>(`${this.baseUrl}/archivos/listarArchivo/${codarc}`);
  }
  registrarArchivo(archivo:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/archivos/registrarArchivo`,archivo)
  }
  modificarArchivo(codarc:number,archivo:any):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/archivos/modificarArchivo/${codarc}`,archivo)
  }
  eliminarArchivo(codarc:number, codusu:number):Observable<Archivos>{
    return this.http.put<Archivos>(`${this.baseUrl}/archivos/eliminarArchivo/${codarc}`,{ codusu})
  }
  bloquearArchivo(codarc:number,  codusu:number):Observable<Archivos>{
    return this.http.put<Archivos>(`${this.baseUrl}/archivos/bloquearArchivo/${codarc}`,{ codusu})
  }
}
