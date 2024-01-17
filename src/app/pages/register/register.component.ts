import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent {
  username: string = '';
  password: string = '';
  showSuccessPopup: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.username, this.password).subscribe(
      (data) => {
        console.log('Registro exitoso:', data);
        this.showSuccessPopup = true;
      },
      (error) => {
        console.error('Error en registro:', error);
        // Mostrar mensaje de error al usuario
      }
    );
  }

  closeSuccessPopup() {
    this.showSuccessPopup = false;
    this.router.navigate(['/login']);
  }
}
