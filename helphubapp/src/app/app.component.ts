import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'PabloDev';
}
