import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../models/member.model';
const baseUrl = 'http://localhost:3000/members';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }
  getAll(page: number): Observable<Member[]> {
    return this.http.get<Member[]>(baseUrl + '?page=' + page);
  }
  
  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(baseUrl );
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
  findByName(member: any): Observable<Member[] | any> {
    return this.http.post<Member[]>(baseUrl + '/username', {member : member});
  }
  addCompetence(data:any): Observable<any>{
    return this.http.post(baseUrl + '/addCompetence', data)
  }

  addCompetenceDetails(data:any): Observable<any>{
    return this.http.post(baseUrl + '/addCompetenceDetails', data) 
  }

 
}
