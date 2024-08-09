import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-insert-vectors',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './insert-vectors.component.html',
  styleUrl: './insert-vectors.component.css',
})
export class InsertVectorsComponent implements OnInit, OnDestroy {
  @Input() vector: any;
  @Output() onAgregar = new EventEmitter();
  private subscription = new Subscription();
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private supabaseService: SupabaseService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      pregunta: [, Validators.required],
      respuesta: [, Validators.required],
      estado: [true],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cambioCheck(x: boolean): void {
    this.formulario.patchValue({
      activo: x,
    });
  }

  limpiarFormulario() {
    this.formulario.reset();
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

  insert(): void {
    if (this.formulario.valid) {
      const pregunta = this.formulario.value.pregunta;
      const respuesta = this.formulario.value.respuesta;
      const estado = this.formulario.value.estado;

      try {
        const user_id = this.supabaseService.getUserId();

        if (!user_id) {
          throw new Error('El usuario no está autenticado.');
        }

        const vectorData = {
          pregunta: pregunta,
          respuesta: respuesta,
          estado: estado,
          user_id: user_id,
        };

        this.supabaseService.insert(vectorData).subscribe({
          next: () => {
            this.toastr.success('Inserted successfully', 'Successfully', {
              timeOut: 1500,
            });
            this.onAgregar.emit();
          },
          error: (err: any) => {
            this.toastr.error('Error inserting record', 'Error', {
              timeOut: 1500,
            });
            console.error(err);
          },
        });
      } catch (error: any) {
        this.toastr.error(error.message);
      }
    } else {
      this.toastr.error('Review and complete all fields!', 'Error', {
        timeOut: 1500,
      });
    }
  }
}
