import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private subscription = new Subscription();
  formulario: FormGroup;
  fieldTextType: boolean = false;
  @Input() modalId: number = 1;
  mostrarCheckboxTerminos: boolean = false;
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

  iniciarSesion() {
    if (this.formulario.valid) {
      const email = this.formulario.value.email;
      const password = this.formulario.value.password;

      this.servicioSupabase.signIn(email, password).subscribe({
        next: () => {
          this.toastr.success("Inicio Sesión con éxito");
          this.router.navigate(['']);
        },
        error: (err) => {
          this.toastr.error("Error al inicar sesión, revise y complete todos los campos!");
          console.log(err);
        }
      });
    }
  }
}
