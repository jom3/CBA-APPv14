import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from '../../models/Usuarios';
import { login } from '../../models/loginUsuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  listarUsuarios(): Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(`${this.baseUrl}/usuarios/listarUsuarios`);
  }
  listarUsuario(codper: number):Observable<Usuarios>{
    return this.http.get<Usuarios>(`${this.baseUrl}/usuarios/listarUsuario/${codper}`);
  }
  registrarUsuario(usuarios:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/usuarios/registrarUsuario`,usuarios)
  }
  modificarUsuario(codper:number,usuarios:any):Observable<Usuarios>{
    return this.http.put<Usuarios>(`${this.baseUrl}/usuarios/modificarUsuario/${codper}`,usuarios)
  }
  eliminarUsuario(codper:number):Observable<Usuarios>{
    return this.http.delete<Usuarios>(`${this.baseUrl}/usuarios/eliminarUsuario/${codper}`)
  }
  restaurarUsuario(codper:number):Observable<Usuarios>{
    return this.http.delete<Usuarios>(`${this.baseUrl}/usuarios/restaurarUsuario/${codper}`)
  }
  registrarDatos(codper:number,usuario:string, contraseña:string):Observable<login>{
    return this.http.post<login>(`${this.baseUrl}/usuarios/registrarDatos/${codper}`,{usuario,contraseña})
  }
}
