import { Paciente } from './paciente.model';
import { Medico } from './medico.model';

export interface Cita {
  id: string;
  paciente_id: string;
  medico_id: string;
  fecha_hora: string;
  duracion_min: number;
  estado: string;
  motivo?: string;
  notas_medico?: string;
  created_at: string;
  updated_at: string;
  
  paciente?: Paciente;
  medico?: Medico;
}
