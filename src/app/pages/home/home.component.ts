import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { GameService } from 'src/app/game/game.service';
import { Subject, interval, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onLogoutClick() {
    this.authService.logout(); // Limpia el token en localStorage
    this.router.navigate(['/login']); // Redirige a la página de login
  }

  toShop(){
    this.router.navigate(['/store']);
  }

  buscarPartida() {
    this.gameService.searchGame().subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        // Maneja la respuesta del servidor según tu lógica

        interval(10000)
          .pipe(
            takeUntil(this.ngUnsubscribe),
            switchMap(() => this.gameService.checkInGame())
          )
          .subscribe((result) => {
            if (result.message !== false) {
              this.router.navigate(['/game-board']);
            }
          });
      },
      (error) => {
        console.error('Error al buscar partida:', error);
        // Maneja los errores
      }
    );
  }
}
