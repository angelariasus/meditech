import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardStats } from '../../../core/services/dashboard.service';
import { CitasService } from '../../../core/services/citas.service';
import { Cita } from '../../../core/models/cita.model';

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.scss'
})
export class DashboardViewComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private citasService = inject(CitasService);

  stats: DashboardStats | null = null;
  actividadReciente: Cita[] = [];
  fechaActual: Date = new Date();

  ngOnInit() {
    this.dashboardService.getStats().subscribe({
      next: (data) => this.stats = data,
      error: (err) => console.error('Error fetching dashboard stats', err)
    });

    this.citasService.getAll().subscribe({
      next: (data) => {
        // Mock "Actividad Reciente" as the last 5 appointments
        this.actividadReciente = data.slice(0, 5);
      },
      error: (err) => console.error('Error fetching recent appointments', err)
    });
  }
}
