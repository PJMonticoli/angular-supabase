import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  scrollToAbout(): void {
    // Obtenemos la posición de la sección "about"
    const aboutSection = document.getElementById('features');
    if (aboutSection) {
      const aboutSectionPosition = aboutSection.offsetTop;

      // Desplazamiento suave hacia la sección "about"
      window.scrollTo({
        top: aboutSectionPosition,
        behavior: 'smooth',
      });
    }
  }
}
