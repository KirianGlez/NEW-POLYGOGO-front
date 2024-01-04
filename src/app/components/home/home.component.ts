import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogoutClick() {
    this.authService.logout(); // Limpia el token en localStorage
    this.router.navigate(['/login']); // Redirige a la página de login
  }
}
