import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UpdateService } from '../../../services/update.service';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {
  private subscription = new Subscription();
  formulario: FormGroup;
  fieldTextType: boolean = false;
  @Input() modalId: number = 1;
  mostrarCheckboxTerminos: boolean = false;
  @Output() userAuthenticated = new EventEmitter<any>();
  constructor(
    private formBuilder: FormBuilder,
    private servicioSupabase : SupabaseService,
    private router : Router,
    private toastr : ToastrService,
    private updateService : UpdateService
  ) {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {}


  get controlEmail(): FormControl {
    return this.formulario.controls['email'] as FormControl;
  }

  get controlPassword() : FormControl{
    return this.formulario.controls['password'] as FormControl;
  }

  
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  async cambiarPassword() {
    const email = this.formulario.get('email')?.value;
    const password = this.formulario.get('password')?.value;
  
    if (this.formulario.valid) {
      try {
        const userData = {
          email: email,
          password: password
        };
  
        const updateUserResponse = await this.updateService.updateUser(email, password, userData);
        this.toastr.success('¡Contraseña cambiada con éxito!');
        this.servicioSupabase.setUser(updateUserResponse.user.id);
        this.router.navigate(['/user-login']);
      } catch (error) {
        this.toastr.error('Error al cambiar la contraseña. Por favor, intenta nuevamente.');
        console.error(error);
      }
    } else {
      this.toastr.error('Por favor, completa todos los campos correctamente.');
    }
  }
  }

  
