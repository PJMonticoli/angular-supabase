import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';


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



  constructor(
    private formBuilder: FormBuilder,
    private servicioSupabase : SupabaseService,
    private toastr : ToastrService
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


  cambiarPassword(): void {
    const email = this.formulario.get('email')?.value;
    const password = this.formulario.get('password')?.value;

    if (this.formulario.valid) {
      // Obtén el token de la URL
      const tokenFromURL = this.getTokenFromURL();
      console.log(tokenFromURL);
      // Verifica si se obtuvo el token de la URL correctamente
      if (tokenFromURL) {
        const userData = {
          email: email,
          password: password
        };

        // Llama a updateUser utilizando el token de la URL
        this.servicioSupabase.updateUser(email, password, userData, tokenFromURL).subscribe({
          next: (response: any) => {
            this.toastr.success('Contraseña cambiada con éxito!','Éxito',{timeOut:1500});
            this.servicioSupabase.setUser(response.user.id);
          },
          error: (err) => {
            this.toastr.error('Error al cambiar la contraseña. Ingrese una contraseña valida y diferente a la anterior.','Error',{timeOut:1500});
            console.error(err);
          }
        });
      } else {
        this.toastr.error('No se pudo obtener el token de la URL. Ingrese una contraseña valida y diferente a la anterior.','Error',{timeOut:1500});
      }
    } else {
      this.toastr.error('Por favor, completa todos los campos correctamente.');
    }
  }

  getTokenFromURL(): string | null {
    const currentUrl = window.location.href;
    const tokenRegex = /access_token=([^&]+)/;
    const match = tokenRegex.exec(currentUrl);
    
    if (match) {
      return match[1]; 
    }
  
    return null;
  }
  
  }

  
