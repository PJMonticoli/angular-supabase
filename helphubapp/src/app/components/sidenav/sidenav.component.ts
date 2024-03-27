import { Component, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent{


constructor(private toastr: ToastrService
  //Si yo aca agrego private servicioSupabase : SupabaseService la pagina no me carga mas 
  ) { }

  cerrarSesion(){
    //  this.servicioSupabase.logout().then((response : any) => {
    //   console.log(response);
    //   this.toastr.success("Cerró Sesión con éxito");
    // }).catch((error : any) => {
    //   console.error(error);
    //   this.toastr.error("Ocurrió un error al intentar Cerrar Sesión");
    // });
  }
}
