import { Component, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SupabaseService } from '../../services/supabase.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent{


constructor(private toastr: ToastrService,private servicioSupabase : SupabaseService) { }

  cerrarSesion() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No vas a poder revertir la acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#39AF09',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result : any) => {
      if (result.isConfirmed) {
        this.servicioSupabase.logout().subscribe({
         next : ()=>{
           this.toastr.success('Cerro Sesión con éxito','Éxito',{timeOut:1500});
           this.toastr.success('Cerro Sesión con éxito','Éxito',{timeOut:1500});
         },
         error : ()=>{
           localStorage.removeItem('access_token');
           localStorage.removeItem('user_id');
           this.toastr.error('Error al Cerrar Sesión','Error',{timeOut:1500});
         }
        }) 
    }})

   }
  
  

  // con el "!!" convierto el valor en boolean
  isLoggedIn(): boolean {
    return this.servicioSupabase.isLoggedIn();
  }
}
