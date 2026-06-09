import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { ApiResponse } from '../models/paciente.model';
import { Medico } from '../models/medico.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  private api = inject(ApiService);

  getAll(): Observable<Medico[]> {
    return this.api.get<ApiResponse<Medico[]>>('/medicos').pipe(
      map(res => res.data)
    );
  }
}
