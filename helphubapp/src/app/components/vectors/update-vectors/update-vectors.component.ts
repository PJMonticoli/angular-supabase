import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-update-vectors',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './update-vectors.component.html',
  styleUrl: './update-vectors.component.css'
})
export class UpdateVectorsComponent implements OnInit,OnDestroy {
  @Input() vector: any;
  @Output() onUpdate = new EventEmitter<any>();
  private subscription = new Subscription();
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private servicioSupabase : SupabaseService,
    private toastr : ToastrService
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      pregunta: [, Validators.required],
      respuesta: [, Validators.required],
      estado: [],
      id: [],
    });
  this.cargar();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  

  actualizarVector(vectorId: number) {
    if (this.formulario.valid) {
      const pregunta = this.formulario.value.pregunta;
      const respuesta = this.formulario.value.respuesta;
      const estado = this.formulario.value.estado;
  
      try {
        const user_id = this.servicioSupabase.getUserId();
        
        if (!user_id) {
          throw new Error('El usuario no está autenticado.');
        }
  
        const vectorData = {
          pregunta: pregunta,
          respuesta: respuesta,
          estado: estado,
          user_id: user_id 
        };
  
        this.servicioSupabase.modificar(vectorId, vectorData).subscribe({
          next: () => {
            this.toastr.success('Actualizo el registro con éxito');
            this.onUpdate.emit();
          },
          error: (err: any) => {
            this.toastr.error('Error al actualizar registro');
            console.error(err);
          }
        });
      } catch (error: any) { 
        this.toastr.error(error.message);
      }
    }else{
      this.toastr.error('Revise y complete todos los campos!');
    }
  }
  
  
  
  
  
  
  
  cargar(): void {
    this.formulario.patchValue(this.vector);
  }


  cambioCheck(x: boolean): void {
    this.formulario.patchValue({
      estado: x
    });
  }


  
  get controlPregunta(): FormControl {
    return this.formulario.controls['pregunta'] as FormControl;
  }

  get controlRespuesta(): FormControl {
    return this.formulario.controls['respuesta'] as FormControl;
  }

  get controlEstado(): FormControl {
    return this.formulario.controls['estado'] as FormControl;
  }

}
