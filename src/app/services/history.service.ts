import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private apiUrl = 'http://localhost:8000/api/user/history';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserHistory(search: string = '', page: number = 1): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const result = this.http.get(`${this.apiUrl}?search=${search}&page=${page}`, {headers});

    return result;
  }
}