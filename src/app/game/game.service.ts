import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl = environment.apiUrl; // Reemplaza con la URL de tu servidor
  constructor(private http: HttpClient, private authService: AuthService) {}

  searchGame(): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      return of(null); // Retorna un Observable con valor null si no hay token
    }
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get<any>(`${this.apiUrl}/game/search-game`, { headers });
  }

  checkInGame(): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      return of(null); // Retorna un Observable con valor null si no hay token
    }

    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get<any>(`${this.apiUrl}/game/check-ingame`, { headers });
  }
}
