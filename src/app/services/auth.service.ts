import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/login';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }

  setToken(token: string, expiresIn: number): void {
    sessionStorage.setItem('authToken', token);

    const expirationTime = new Date().getTime() + expiresIn * 1000;
    sessionStorage.setItem('tokenExpiration', expirationTime.toString());
  }

  getToken(): string | null {
    const expirationTime = sessionStorage.getItem('tokenExpiration');

    if (expirationTime && new Date().getTime() > parseInt(expirationTime)) {
      this.logout();
      return null;
    }

    return sessionStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('tokenExpiration');
  }
}
