import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model';

const baseUrl = 'http://localhost:3000/services';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Service[]> {
    return this.http.get<Service[]>(baseUrl);
  }
  getAllWithPaging(page: number): Observable<Service[]> {
    return this.http.get<Service[]>(baseUrl + '?page=' + page);
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
  findByName(service: any): Observable<Service[] | any> {
    return this.http.post<Service[]>(baseUrl + '/service', {service : service});
  }
  addMember(data:any): Observable<any>{
    return this.http.post(baseUrl + '/addMember', data)
  }
  removeMember(data:any): Observable<any>{
    return this.http.post(baseUrl + '/removeMember', data)
  }

  addServiceDemandeDetails(data:any): Observable<any>{
    return this.http.post(baseUrl + '/addServiceDemandeDetails', data) 
  }

}
