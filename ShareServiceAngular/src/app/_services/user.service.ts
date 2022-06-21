import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
const baseUrl = 'http://localhost:3000/users';
const baseUrlEmail = 'http://localhost:3000/userEmail';
const baseUrldelete = 'http://localhost:3000/userId';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }
  getAllWithPages(page: number): Observable<User[]> {
    return this.http.get<User[]>(baseUrl + '?page=' + page);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  addFourniture(loginUser:string, loginPassword: string, name: string, label: string):Observable<any>{
    return this.http.post(baseUrl + '/fourniture', {
      loginUser,
      loginPassword,
      name,
      label
    }, httpOptions);

  }
  update(id: any, data: any): Observable<any> {
    console.log(data)
    return this.http.patch(`${baseUrl}/${id}`, data);
  }
  delete(id: any, loginUser: any, loginPassword: any): Observable<any> {
    return this.http.post(`${baseUrldelete}/${id}` , {
      loginUser,
      loginPassword
    }, httpOptions);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByEmail(email: any): Observable<User[] | any> {
    return this.http.post<User[]>(baseUrlEmail, {email : email});
  }
  findByName(title: any): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}?title=${title}`);
  }
  getPublicContent(): Observable<any> {
    return this.http.get(baseUrl, { responseType: 'text' });
  }
  getUserBoard(): Observable<any> {
    return this.http.get(baseUrl , { responseType: 'text' });
  }
  
  getAdminBoard(): Observable<any> {
    return this.http.get(baseUrl, { responseType: 'text' });
  }
}
