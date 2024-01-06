import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl = environment.apiUrl; // Reemplaza con la URL de tu servidor

  constructor(private http: HttpClient) {}

  buscarPartida(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get<any>(`${this.apiUrl}/game/search-game`, { headers });
  }
}
