import { Component, EventEmitter, Input,Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { SupabaseService } from '../../../services/supabase.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-delete-vectors',
  standalone: true,
  imports: [],
  templateUrl: './delete-vectors.component.html',
  styleUrl: './delete-vectors.component.css'
})
export class DeleteVectorsComponent{
  @Input() vector: any;
  @Output () onEliminado = new EventEmitter();
  private subscription = new Subscription();
  constructor(private servicioSupabase : SupabaseService,private toastr : ToastrService){}

  eliminar(vector_id: any) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No vas a poder revertir la acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#39AF09',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result : any) => {
      if (result.isConfirmed) {
        this.subscription.add(
          this.servicioSupabase.deleteVector(vector_id).subscribe({
            next : ()=>{
              Swal.fire({title: 'Listo', text : 'Eliminaste el registro con éxito', icon: 'success'});
              this.onEliminado.emit();
            },
            error : (err : any)=>{
              Swal.fire({title:'Error', text:`Error al intentar eliminar registro: ${err}`, icon: 'error'});
            }
          })
        )
        Swal.fire(
          'Eliminado!',
          'El registro ha sido eliminado.',
          'success'
        )
      }
    })
    }
  }
 

