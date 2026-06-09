import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    // In a real app, bind to a form group. For now, simulate login.
    this.auth.login({ email: 'doctor@clinica.com', password: 'password' }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        console.error('Login failed', err);
        alert('Credenciales incorrectas o problema de conexión.');
      }
    });
  }
}
