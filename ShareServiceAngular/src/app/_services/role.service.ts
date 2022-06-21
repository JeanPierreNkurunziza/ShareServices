import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';
const baseUrl = 'http://localhost:3000/roles';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(baseUrl);
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
  getRole(role: any): Observable<Role[] | any> {
    return this.http.post<Role[]>(baseUrl + '/roles', {role : role});
  }

}
