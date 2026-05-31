import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private apiUrl = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) { }

  // Register user
  register(data: any): Observable<string>
  {
    return this.http.post(`${this.apiUrl}/register`, data, { responseType: 'text' });
  }

  // Login user
  login(data: any): Observable<User>
  {
    return this.http.post<User>(`${this.apiUrl}/login`, data);
  }

  // Save Token
  saveToken(token: string): void
  {
      localStorage.setItem('token', token);
  }

  // Get Token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Logout
  logout(): void
  {
      localStorage.removeItem('token');
  }

  // check login
  isLoggedIn(): boolean{
    return this.getToken() !== null;

  }
}
