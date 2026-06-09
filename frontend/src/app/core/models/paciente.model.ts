export interface Paciente {
  id: string;
  user_id: string;
  nombre: string;
  apellido: string;
  dni: string;
  fecha_nacimiento: string;
  telefono?: string;
  direccion?: string;
  grupo_sanguineo?: string;
  alergias?: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}
