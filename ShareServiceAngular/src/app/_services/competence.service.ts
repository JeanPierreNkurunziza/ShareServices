import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competence } from '../models/competence.model';
const baseUrl = 'http://localhost:3000/competences';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  constructor(private http: HttpClient) { }
  getAllCompetences(page:number): Observable<Competence[]> {
    return this.http.get<Competence[]>(baseUrl + '?page=' + page);
  }
  getAll(): Observable<Competence[]> {
    return this.http.get<Competence[]>(baseUrl);
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
  findByName(competence: any): Observable<Competence[] | any> {
    return this.http.post<Competence[]>(baseUrl + '/competence', {competence : competence});
  }
 
 
}

