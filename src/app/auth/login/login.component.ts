import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (data) => {
        if (data.token) {
          this.authService.saveToken(data.token); // Guardar el token en localStorage
        }
        // Redirigir a una página después del inicio de sesión exitoso
        this.router.navigate(['/home']); // Reemplaza '/dashboard' con la ruta deseada
      },
      (error) => {
        console.error('Error en inicio de sesión:', error);
        // Manejar errores de inicio de sesión
      }
    );
  }
}
