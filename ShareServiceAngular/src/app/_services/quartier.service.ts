import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quartier } from '../models/quartier.model';
const baseUrl = 'http://localhost:3000/quartiers';

@Injectable({
  providedIn: 'root'
})
export class QuartierService {
  constructor(private http: HttpClient) { }
  getAll(): Observable<Quartier[]> {
    return this.http.get<Quartier[]>(baseUrl);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  
  update(id: any, data: any): Observable<any> {
    return this.http.patch(`${baseUrl}/${id}`, data);
  }
  delete(id:any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  getQuartierId(quartier: any): Observable<Quartier[] | any> {
    return this.http.post<Quartier[]>(baseUrl + '/quartier', {quartier : quartier});
  }

 
}
