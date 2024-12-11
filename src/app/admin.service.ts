import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl: string = 'http://localhost:2004/';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'user/profiles');
  }

  deleteUser(id: number) {
    return this.http.post(this.baseUrl + `user/profile/delete/${id}`, null);
  }

  deleteRealestate(id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    return this.http.post(this.baseUrl + `realestate/delete/${id}`, null, {
      headers,
    });
  }
}
