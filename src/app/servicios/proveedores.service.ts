import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedores } from '../../models/Proveedores';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  listarProveedores(): Observable<Proveedores[]>{
    return this.http.get<Proveedores[]>(`${this.baseUrl}/proveedores/listarProveedores`);
  }
  listarProveedoresActivos(): Observable<Proveedores[]>{
    return this.http.get<Proveedores[]>(`${this.baseUrl}/proveedores/listarProveedoresActivos`);
  }
  listarProveedor(codprov:number): Observable<Proveedores>{
    return this.http.get<Proveedores>(`${this.baseUrl}/proveedores/listarProveedor/${codprov}`);
  }
  registrarProveedor(prov:Proveedores):Observable<Proveedores>{
    return this.http.post<Proveedores>(`${this.baseUrl}/proveedores/registrarProveedor`,prov)
  }
  modificarProveedor(codprov:number,prov:Proveedores):Observable<Proveedores>{
    return this.http.put<Proveedores>(`${this.baseUrl}/proveedores/modificarProveedor/${codprov}`,prov)
  }
  eliminarProveedor(codprov:number):Observable<Proveedores>{
    return this.http.delete<Proveedores>(`${this.baseUrl}/proveedores/eliminarProveedor/${codprov}`)
  }
  restaurarProveedor(codprov:number):Observable<Proveedores>{
    return this.http.delete<Proveedores>(`${this.baseUrl}/proveedores/restaurarProveedor/${codprov}`)
  }
}
