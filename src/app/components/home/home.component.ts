import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { GameService } from 'src/app/game/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private gameService: GameService
  ) {}

  onLogoutClick() {
    this.authService.logout(); // Limpia el token en localStorage
    this.router.navigate(['/login']); // Redirige a la página de login
  }

  buscarPartida() {
    const token = this.authService.getToken();

    if (token != null) {
      this.gameService.buscarPartida(token).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          // Maneja la respuesta del servidor según tu lógica
        },
        (error) => {
          console.error('Error al buscar partida:', error);
          // Maneja los errores
        }
      );
    }
  }
}
