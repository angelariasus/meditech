export interface Medico {
  id: string;
  user_id: string;
  nombre: string;
  apellido: string;
  especialidad: string;
  colegiatura: string;
  telefono?: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}
