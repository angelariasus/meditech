import { Component, inject, OnInit } from '@angular/core';
import { PacientesService } from '../../../core/services/pacientes.service';
import { Paciente } from '../../../core/models/paciente.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patients-list.component.html',
  styleUrl: './patients-list.component.scss'
})
export class PatientsListComponent implements OnInit {
  private pacientesService = inject(PacientesService);
  pacientes: Paciente[] = [];
  
  ngOnInit(): void {
    this.pacientesService.getAll().subscribe({
      next: (data) => {
        this.pacientes = data;
      },
      error: (err) => console.error('Error fetching patients:', err)
    });
  }
}
