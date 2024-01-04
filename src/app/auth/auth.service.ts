import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  BehaviorSubject,
  throwError,
  map,
  catchError,
  of,
} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = '';

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<any> {
    const registerData = { username, password };
    return this.http.post<any>(`${this.apiUrl}/auth/register`, registerData);
  }

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post<any>(`${this.apiUrl}/auth/login`, loginData);
  }

  // Método para guardar el token en localStorage después de iniciar sesión
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Método para obtener el token guardado en localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Método para eliminar el token de localStorage al cerrar sesión
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  validateToken(): Observable<any> {
    const token = this.getToken();

    // Realizar una solicitud HTTP al endpoint del backend para validar el token
    return this.http
      .post<any>(`${this.apiUrl}/auth/verify-token`, { token })
      .pipe(
        map((response) => {
          return true; // 'valid' es un valor booleano que indica si el token es válido o no en la respuesta del backend
        }),
        catchError(() => {
          return of(false); // Manejar errores en la solicitud y devolver false en caso de error
        })
      );
  }
}
