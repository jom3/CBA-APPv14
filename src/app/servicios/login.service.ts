import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosUsuarios } from '../../models/DatosUsuarios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  static islogged(): any[] | undefined {
    throw new Error('Method not implemented.');
  }
  session:boolean = false;
  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient, private router:Router) { }
  Autentificar(sesion:DatosUsuarios): Observable<DatosUsuarios>{
    return this.http.post<DatosUsuarios>(`${this.baseUrl}/login/loginUsuario`,sesion);
  }
  islogged(){
    if(localStorage.getItem('token') !=null && localStorage.getItem('codigo')!=null){
      return this.session = true;
    }else{
      return this.session = false;
    }
  }
  logout():Observable<any>{
          let codper = localStorage.getItem('codigo')
          location.reload();
          localStorage.clear();
          return this.http.post<any>(`${this.baseUrl}/login/cerrarSesion`,codper);
  }
  recuperar(email:string):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/login/recuperar`,{email})
  }
  cambiarPassword(xpass:any,codper:number):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/login/cambiarPassword/${codper}`, xpass)
    console.log(xpass + ' '+ codper)
  }
}
