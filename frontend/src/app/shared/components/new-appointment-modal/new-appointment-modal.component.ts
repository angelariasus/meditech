import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../core/services/modal.service';
import { PacientesService } from '../../../core/services/pacientes.service';
import { MedicosService } from '../../../core/services/medicos.service';
import { ApiService } from '../../../core/services/api.service';
import { Paciente } from '../../../core/models/paciente.model';
import { Medico } from '../../../core/models/medico.model';

@Component({
  selector: 'app-new-appointment-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-appointment-modal.component.html',
  styleUrl: './new-appointment-modal.component.scss'
})
export class NewAppointmentModalComponent implements OnInit {
  modalService = inject(ModalService);
  private pacientesService = inject(PacientesService);
  private medicosService = inject(MedicosService);
  private api = inject(ApiService);

  isOpen = false;
  
  pacientes: Paciente[] = [];
  medicos: Medico[] = [];

  formData = {
    paciente_id: '',
    medico_id: '',
    fecha_hora: '',
    motivo: ''
  };

  ngOnInit() {
    this.modalService.newAppointmentModal$.subscribe(isOpen => {
      this.isOpen = isOpen;
      if (isOpen) {
        this.loadData();
      }
    });
  }

  loadData() {
    this.pacientesService.getAll().subscribe(data => this.pacientes = data);
    this.medicosService.getAll().subscribe(data => this.medicos = data);
  }

  close() {
    this.modalService.closeNewAppointmentModal();
  }

  onSubmit() {
    if (!this.formData.paciente_id || !this.formData.medico_id || !this.formData.fecha_hora) {
      alert('Por favor llene los campos requeridos');
      return;
    }

    this.api.post('/citas', this.formData).subscribe({
      next: () => {
        alert('Cita creada exitosamente');
        this.close();
        window.location.reload(); // Reload to reflect changes, in a real app we would use subjects
      },
      error: (err) => {
        console.error('Error creando cita', err);
        alert('Ocurrió un error al crear la cita');
      }
    });
  }
}
