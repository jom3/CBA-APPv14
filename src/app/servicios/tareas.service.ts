import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tareas } from '../../models/Tareas';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  listarTareas(): Observable<Tareas[]>{
    return this.http.get<Tareas[]>(`${this.baseUrl}/tareas/listarTareas`);
  }
  listarTotalTareas(codpro:number): Observable<Tareas[]>{
    return this.http.get<Tareas[]>(`${this.baseUrl}/tareas/listarTotalTareas/${codpro}`);
  }
  listarTareasActivas(codpro:number): Observable<Tareas[]>{
    return this.http.get<Tareas[]>(`${this.baseUrl}/tareas/listarTareasActivas/${codpro}`);
  }
  listarTareasCompletadas(codpro:number): Observable<Tareas[]>{
    return this.http.get<Tareas[]>(`${this.baseUrl}/tareas/listarTareasCompletadas/${codpro}`);
  }
  listarTareasbyProyecto(codpro: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/tareas/listarTareasbyProyecto/${codpro}`);
  }
  listarTareasbyPersonal(codmiem: number): Observable<Tareas[]>{
    return this.http.get<Tareas[]>(`${this.baseUrl}/tareas/listarTareasbyPersonal/${codmiem}`);
  }
  listarTareasbyCodigo(codper: number): Observable<Tareas[]>{
    return this.http.get<Tareas[]>(`${this.baseUrl}/tareas/listarTareasbyCodigo/${codper}`);
  }
  listarTarea(codt: number):Observable<Tareas>{
    return this.http.get<Tareas>(`${this.baseUrl}/tareas/listarTarea/${codt}`);
  }
  registrarTarea(tarea:Tareas):Observable<Tareas>{
    return this.http.post<Tareas>(`${this.baseUrl}/tareas/registrarTarea`,tarea)
  }
  modificarTarea(codt:number,tarea:Tareas):Observable<Tareas>{
    return this.http.put<Tareas>(`${this.baseUrl}/tareas/modificarTarea/${codt}`,tarea)
  }
  eliminarTarea(codt:number,codusu:number):Observable<Tareas>{
    return this.http.put<Tareas>(`${this.baseUrl}/tareas/eliminarTarea/${codt}`,{codusu})
  }
  restaurarTarea(codt:number,codusu:number):Observable<Tareas>{
    return this.http.put<Tareas>(`${this.baseUrl}/tareas/restaurarTarea/${codt}`,{codusu})
  }
  completarTarea(codt:number,codusu:number):Observable<Tareas>{
    return this.http.put<Tareas>(`${this.baseUrl}/tareas/completarTarea/${codt}`,{codusu})
  }
  listarHistorial(codt: number): Observable<Tareas[]>{
    return this.http.get<Tareas[]>(`${this.baseUrl}/tareas/listarHistorial/${codt}`);
  }
  listarHistorialbyProyecto(codpro: number): Observable<Tareas[]>{
    return this.http.get<Tareas[]>(`${this.baseUrl}/tareas/listarHistorialbyProyecto/${codpro}`);
  }
}
