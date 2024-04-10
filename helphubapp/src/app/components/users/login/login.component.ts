import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private subscription = new Subscription();
  formulario: FormGroup;
  formRecovery: FormGroup;
  fieldTextType: boolean = false;
  @Input() modalId: number = 1;
  mostrarCheckboxTerminos: boolean = false;
  @Output() userAuthenticated = new EventEmitter<any>();
  constructor(
    private formBuilder: FormBuilder,
    private servicioSupabase : SupabaseService,
    private router : Router,
    private toastr : ToastrService
  ) {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.formRecovery = this.formBuilder.group({
      recuperarEmail: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {}


  get controlEmail(): FormControl {
    return this.formulario.controls['email'] as FormControl;
  }
  get recuperarEmail(): FormControl {
    return this.formulario.controls['recuperarEmail'] as FormControl;
  }

  get controlPassword() : FormControl{
    return this.formulario.controls['password'] as FormControl;
  }


  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  iniciarSesion() {
    if (this.formulario.valid) {
      const email = this.formulario.value.email;
      const password = this.formulario.value.password;
  
      this.servicioSupabase.signIn(email, password).subscribe({
        next: (response: any) => {
          this.toastr.success("Inicio Sesión con éxito, Bienvenido!");
          this.servicioSupabase.setUser(response.user.id); 
          this.router.navigate(['/vectors_table']);
        },
        error: (err) => {
          this.toastr.error("Correo electrónico y/o contraseña incorrecta");
          console.log(err);
        }
      });
    }
  }

  recuperarPassword(): void {
    const email = this.formRecovery.get('recuperarEmail')?.value;
    if (this.formRecovery.valid) {
      this.servicioSupabase.recoverPassword(email).subscribe({
        next : ()=>{
          this.toastr.success("Se ha enviado un enlace de recuperación de contraseña al correo electrónico proporcionado.");
          this.router.navigate(['/']);
        },
        error : (err : any)=>{
          this.toastr.error("Error al intentar enviar correo de recuperación de contraseña.");
          console.log(err);
        }
      });

    } else{
      this.toastr.error("Error al intentar enviar correo de recuperación de contraseña, complete todos los campos");
    }
  }

  limpiarFormulario() {
    this.formRecovery.reset(); 
  }
}

