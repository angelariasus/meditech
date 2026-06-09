import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { ApiResponse } from '../models/paciente.model';
import { Cita } from '../models/cita.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private api = inject(ApiService);

  getAll(): Observable<Cita[]> {
    return this.api.get<ApiResponse<Cita[]>>('/citas').pipe(
      map(res => res.data)
    );
  }

  getMias(): Observable<Cita[]> {
    return this.api.get<ApiResponse<Cita[]>>('/citas/mias').pipe(
      map(res => res.data)
    );
  }

  getById(id: string): Observable<Cita> {
    return this.api.get<ApiResponse<Cita>>(`/citas/${id}`).pipe(
      map(res => res.data)
    );
  }
}
