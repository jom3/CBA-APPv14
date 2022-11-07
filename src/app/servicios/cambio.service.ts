import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CambioService {
  baseUrl = 'http://api.currencylayer.com/live?access_key=aed4a73f4984e06f3907d890f510576c&currencies=BOB';

  constructor(private http: HttpClient) { }

  obtenerCambio(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
