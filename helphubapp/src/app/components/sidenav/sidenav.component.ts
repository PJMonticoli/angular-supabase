import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  // constructor(private servicioSupabase : SupabaseService,private toastr : ToastrService){}
  // cerrarSesion(){
  //    this.servicioSupabase.logout().then(response => {
  //     console.log(response);
  //     this.toastr.success("Cerró Sesión con éxito");
  //   }).catch(error => {
  //     console.error(error);
  //     this.toastr.error("Ocurrió un error al intentar Cerrar Sesión");
  //   });
  // }
}
