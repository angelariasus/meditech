import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasService } from '../../../core/services/citas.service';
import { Cita } from '../../../core/models/cita.model';

@Component({
  selector: 'app-appointments-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointments-list.component.html',
  styleUrl: './appointments-list.component.scss'
})
export class AppointmentsListComponent implements OnInit {
  private citasService = inject(CitasService);
  
  citasPendientes: Cita[] = [];
  citasAceptadas: Cita[] = [];

  ngOnInit() {
    this.citasService.getAll().subscribe({
      next: (data) => {
        this.citasPendientes = data.filter(c => c.estado === 'pendiente');
        this.citasAceptadas = data.filter(c => c.estado !== 'pendiente');
      },
      error: (err) => console.error('Error fetching appointments', err)
    });
  }
}
