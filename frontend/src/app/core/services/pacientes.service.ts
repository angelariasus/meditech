import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { ApiResponse, Paciente } from '../models/paciente.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private api = inject(ApiService);

  getAll(): Observable<Paciente[]> {
    return this.api.get<ApiResponse<Paciente[]>>('/pacientes').pipe(
      map(res => res.data)
    );
  }

  getById(id: string): Observable<Paciente> {
    return this.api.get<ApiResponse<Paciente>>(`/pacientes/${id}`).pipe(
      map(res => res.data)
    );
  }

  create(paciente: any): Observable<Paciente> {
    return this.api.post<ApiResponse<Paciente>>('/pacientes', paciente).pipe(
      map(res => res.data)
    );
  }
}
