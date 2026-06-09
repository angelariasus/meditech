import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private modalService = inject(ModalService);

  openNewAppointment() {
    this.modalService.openNewAppointmentModal();
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login']) // Redirect anyway if backend fails
    });
  }
}
