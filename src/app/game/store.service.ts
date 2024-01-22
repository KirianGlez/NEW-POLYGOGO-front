import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Skin } from './models/skin.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

  obtenerSkins(): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      return of(null); // Retorna un Observable con valor null si no hay token
    }
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get<Skin[]>(`${this.apiUrl}/skins`, { headers });
  }

  comprarSkin(userId: string, skinId: string): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      return of(null); // Retorna un Observable con valor null si no hay token
    }
    const data = {userId, skinId};
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.post(`${this.apiUrl}/comprar`, data, { headers });
  }
}
