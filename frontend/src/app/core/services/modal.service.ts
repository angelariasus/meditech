import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private newAppointmentModalSubject = new BehaviorSubject<boolean>(false);
  public newAppointmentModal$ = this.newAppointmentModalSubject.asObservable();

  openNewAppointmentModal() {
    this.newAppointmentModalSubject.next(true);
  }

  closeNewAppointmentModal() {
    this.newAppointmentModalSubject.next(false);
  }
}
