import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './mobile-nav.component.html',
  styleUrl: './mobile-nav.component.scss'
})
export class MobileNavComponent {

}
