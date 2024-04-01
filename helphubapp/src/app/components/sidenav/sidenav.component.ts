import { Component, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent{


constructor(private toastr: ToastrService,private servicioSupabase : SupabaseService
  //Si yo aca agrego private servicioSupabase : SupabaseService la pagina no me carga mas 
  ) { }

  cerrarSesion() {
   this.servicioSupabase.logout().subscribe({
    next : ()=>{
      this.toastr.success('Cerro Sesión con éxito');
    },
    error : (err)=>{
      console.log(err);
      this.toastr.error('Error al intentar Cerrar Sesión');
    }
   }) 
  }
}
