import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductosServicios } from '../../models/ProductosServicios';

@Injectable({
  providedIn: 'root'
})
export class ProductosServiciosService {
  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  listarProductosServicios(): Observable<ProductosServicios[]>{
    return this.http.get<ProductosServicios[]>(`${this.baseUrl}/productos_servicios/listarProductosServicios`);
  }
  listarProductoServicio(codps: number):Observable<ProductosServicios>{
    return this.http.get<ProductosServicios>(`${this.baseUrl}/productos_servicios/listarProductoServicio/${codps}`);
  }
  registrarProductoServicio(ps:ProductosServicios):Observable<ProductosServicios>{
    return this.http.post<ProductosServicios>(`${this.baseUrl}/productos_servicios/registrarProductoServicio`,ps)
  }
  modificarProductoServicio(codps:number,ps:ProductosServicios):Observable<ProductosServicios>{
    return this.http.put<ProductosServicios>(`${this.baseUrl}/productos_servicios/modificarProductoServicio/${codps}`,ps)
  }
  eliminarProductoServicio(codps:number):Observable<ProductosServicios>{
    return this.http.delete<ProductosServicios>(`${this.baseUrl}/productos_servicios/eliminarProductoServicio/${codps}`)
  }
  restaurarProductoServicio(codps:number):Observable<ProductosServicios>{
    return this.http.delete<ProductosServicios>(`${this.baseUrl}/productos_servicios/restaurarProductoServicio/${codps}`)
  }
}
