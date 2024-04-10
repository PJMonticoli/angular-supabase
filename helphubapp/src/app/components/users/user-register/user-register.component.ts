import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  private subscription = new Subscription();
  formulario: FormGroup;
  fieldTextType: boolean = false;


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

  register() {
    if (this.formulario.valid) {
      const email = this.formulario.value.email;
      const password = this.formulario.value.password;
  
      this.servicioSupabase.signUp(email, password).subscribe({
        next: () => {
          this.toastr.success("Usuario registrado con éxito");
          this.router.navigate(['/user-login']);
        },
        error: (err) => {
          if (err.status === 422 && err.error && err.error.error_code === "user_already_exists") {
            this.toastr.error("El correo electrónico ya está en uso, por favor ingrese otro diferente.");
          } else {
            this.toastr.error("Error al registrarse, revise y complete todos los campos!");
          }
          console.log(err);
        }
      });
    }
  }
  
}
