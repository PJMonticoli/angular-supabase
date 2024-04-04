import { Component, EventEmitter, Input,Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { SupabaseService } from '../../../services/supabase.service';

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

  eliminar(vector_id : any){
    try{
      this.servicioSupabase.deleteVector(vector_id).subscribe({
        next: (response: any) => {
          this.toastr.success('Registro eliminado con éxito');
          this.onEliminado.emit();
        },
        error: (err: any) => {
          this.toastr.error('Error al intentar eliminar registro');
          console.error(err);
        }
      });
    }catch (error : any){
      console.error(error);
    }
    
}

}
