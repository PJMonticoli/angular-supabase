import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  constructor(
    private toastr: ToastrService,
    private servicioSupabase: SupabaseService
  ) {}

  cerrarSesion() {
    this.servicioSupabase.logout().subscribe({
      next: () => {
        this.toastr.success('Successfully logout', 'Successfully', {
          timeOut: 1500,
        });
      },
      error: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id');
        this.toastr.error('Logout Error', 'Error', { timeOut: 1500 });
      },
    });
  }

  // con el "!!" convierto el valor en boolean
  isLoggedIn(): boolean {
    return this.servicioSupabase.isLoggedIn();
  }
}
