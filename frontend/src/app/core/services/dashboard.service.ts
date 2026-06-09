import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { ApiResponse } from '../models/paciente.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface DashboardStats {
  citasHoy?: number;
  citasMensuales?: number;
  especialidadTop?: string;
  pacientesAtendidos?: number;
  rendimiento?: string;
  [key: string]: any; // fallback for unmapped stats
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private api = inject(ApiService);

  getStats(): Observable<DashboardStats> {
    return this.api.get<ApiResponse<DashboardStats>>('/dashboard/stats').pipe(
      map(res => res.data)
    );
  }
}
