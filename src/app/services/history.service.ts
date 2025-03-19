import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeader(): HttpHeaders {
    const token = this.authService.getToken();

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getHistory(search: string = '', page: number = 1): Observable<any> {
    const headers = this.getAuthHeader();
    return this.http.get(`${this.apiUrl}/user/history?search=${search}&page=${page}`, {headers});
  }

  getById(id: number): Observable<any> {
    const headers = this.getAuthHeader();
    return this.http.get<any>(`${this.apiUrl}/user/history/${id}`, {headers});
  }

  create(data: any): Observable<any> {
    const headers = this.getAuthHeader();
    return this.http.post<any>(`${this.apiUrl}/user/history`, data, {headers});
  }

  update(id: number, data: any): Observable<any> {
    const headers = this.getAuthHeader();
    return this.http.put<any>(`${this.apiUrl}/user/history/${id}`, data, {headers});
  }

  // delete(id: number): Observable<any> {
  //   const headers = this.getAuthHeader();
  //   return this.http.delete<any>(`${this.apiUrl}/user/history${id}`, {headers});
  // }

  getRegionals(): Observable<any[]> {
    const headers = this.getAuthHeader();
    return this.http.get<any[]>(`${this.apiUrl}/regionals`, {headers});
  }

  getSpecialties(): Observable<any[]> {
    const headers = this.getAuthHeader();
    return this.http.get<any[]>(`${this.apiUrl}/specialties`, {headers});
  }
}