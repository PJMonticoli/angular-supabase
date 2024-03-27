import { Component, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { ToastrService } from 'ngx-toastr';
import { CargarScriptsService } from '../../services/cargar-scripts.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent{


constructor(private toastr: ToastrService) { }

  // ngOnInit(): void {
  //   this.cargarScript.cargaAsync(["sidenav"]).then(() => {
  //     // Aquí puedes ejecutar cualquier lógica adicional después de cargar los scripts
  //   }).catch(error => {
  //     console.error('Error al cargar scripts:', error);
  //   });
  // }
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
