import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { SupabaseService } from '../../../services/supabase.service';
// import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-delete-vectors',
  standalone: true,
  imports: [],
  templateUrl: './delete-vectors.component.html',
  styleUrl: './delete-vectors.component.css',
})
export class DeleteVectorsComponent {
  @Input() vector: any;
  @Output() onEliminado = new EventEmitter();
  private subscription = new Subscription();
  constructor(
    private servicioSupabase: SupabaseService,
    private toastr: ToastrService
  ) {}

  eliminar(vector_id: any) {
    // Swal.fire({
    //   title: '¿Estas seguro?',
    //   text: 'No vas a poder revertir la acción!',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#39AF09',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Si, eliminar',
    // }).then((result: any) => {
    //   if (result.isConfirmed) {
    this.subscription.add(
      this.servicioSupabase.deleteVector(vector_id).subscribe({
        next: () => {
          this.toastr.success('Eliminaste el registro con éxito', 'Éxito', {
            timeOut: 1500,
          });
          this.onEliminado.emit();
        },
        error: (err: any) => {
          this.toastr.success('Error al intentar eliminar registro', 'Error', {
            timeOut: 1500,
          });
        },
      })
    );
  }
}
