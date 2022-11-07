import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { login } from '../../models/loginUsuarios';
import { Personal } from '../../models/Personal';
import { Roles } from '../../models/Roles';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  listarPersonales(): Observable<Personal[]>{
    return this.http.get<Personal[]>(`${this.baseUrl}/personal/listarPersonales`);
  }
  listarPersonal(codper: number):Observable<Personal>{
    return this.http.get<Personal>(`${this.baseUrl}/personal/listarPersonal/${codper}`);
  }
  registrarPersonal(personal:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/personal/registrarPersonal`,personal)
  }
  modificarPersonal(codper:number,personal:Personal):Observable<Personal>{
    return this.http.put<Personal>(`${this.baseUrl}/personal/modificarPersonal/${codper}`, personal)
  }
  eliminarPersonal(codper:number):Observable<Personal>{
    return this.http.delete<Personal>(`${this.baseUrl}/personal/eliminarPersonal/${codper}`)
  }
  restaurarPersonal(codper:number):Observable<Personal>{
    return this.http.delete<Personal>(`${this.baseUrl}/personal/restaurarPersonal/${codper}`)
  }
  registrarDatos(codper:number,usuario:string, contraseña:string):Observable<login>{
    return this.http.post<login>(`${this.baseUrl}/personal/registrarDatos/${codper}`,{usuario,contraseña})
  }
}
