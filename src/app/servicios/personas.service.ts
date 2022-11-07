import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personas } from '../../models/Personas';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  listarPersonas(): Observable<Personas[]>{
    return this.http.get<Personas[]>(`${this.baseUrl}/personas/listarPersonas`);
  }
  listarPersona(codper: number):Observable<Personas>{
    return this.http.get<Personas>(`${this.baseUrl}/personas/listarPersona/${codper}`);
  }
  // listarEstado(codper: number):Observable<Personas>{
  //   return this.http.get<Personas>(`${this.baseUrl}/personas/listarEstado/${codper}`);
  // }
  listarImagen(codper: number):Observable<Personas>{
    return this.http.get<Personas>(`${this.baseUrl}/imagenes/${codper}`);
  }
  registrarPersona(personas:any):Observable<Personas>{
    return this.http.post<Personas>(`${this.baseUrl}/personas/registrarPersona`,personas)
  }
  modificarPersona(codper:number,personas:any):Observable<Personas>{
    return this.http.put<Personas>(`${this.baseUrl}/personas/modificarPersona/${codper}`,personas)
  }
  eliminarPersona(codper:number):Observable<Personas>{
    return this.http.delete<Personas>(`${this.baseUrl}/personas/eliminarPersona/${codper}`)
  }
  restaurarPersona(codper:number):Observable<Personas>{
    return this.http.delete<Personas>(`${this.baseUrl}/personas/restaurarPersona/${codper}`)
  }
}
