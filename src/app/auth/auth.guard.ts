import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GameService } from '../game/game.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private gameService: GameService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.validateToken().pipe(
      tap((loggedIn: boolean) => {
        if (!loggedIn) {
          this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión si no está autenticado
        } else {
          this.gameService.checkInGame().subscribe((response) => {
            if (response.message != false) {
              this.router.navigate(['/game-board']);
            }
          });
        }
      })
    );
  }
}
