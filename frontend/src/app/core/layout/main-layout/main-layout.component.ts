import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { MobileNavComponent } from '../mobile-nav/mobile-nav.component';
import { NewAppointmentModalComponent } from '../../../shared/components/new-appointment-modal/new-appointment-modal.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, MobileNavComponent, NewAppointmentModalComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
