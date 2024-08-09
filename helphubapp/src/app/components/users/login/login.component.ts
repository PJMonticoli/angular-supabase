import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private subscription = new Subscription();
  formulario: FormGroup;
  formRecovery: FormGroup;
  fieldTextType: boolean = false;
  deshabilitarBoton: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private servicioSupabase: SupabaseService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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

  get controlPassword(): FormControl {
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
          this.toastr.success('Successful login', 'Welcome!', {
            timeOut: 1500,
          });
          this.servicioSupabase.setUser(response.user.id);
          this.router.navigate(['/vectors_table']);
        },
        error: (err) => {
          this.toastr.error('Email or password wrong', 'Error', {
            timeOut: 1500,
          });
          console.log(err);
        },
      });
    }
  }

  recuperarPassword(): void {
    const email = this.formRecovery.get('recuperarEmail')?.value;
    if (this.formRecovery.valid) {
      this.servicioSupabase.recoverPassword(email).subscribe({
        next: () => {
          this.deshabilitarBoton = true;
          this.toastr.success(
            'A password recovery link has been sent to the email provided.'
          );
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          this.deshabilitarBoton = false;
          this.toastr.error(
            'Error when trying to send password recovery email.'
          );
          console.log(err);
        },
      });
    } else {
      this.toastr.error(
        'Error when trying to send password recovery email, please complete all fields'
      );
    }
  }

  limpiarFormulario() {
    this.formRecovery.reset();
  }

  handleKeyDown(event: KeyboardEvent) {
    // Verifica si se presionó la tecla Enter
    if (event.key === 'Enter') {
      event.preventDefault();

      if (this.formulario.valid) {
        this.iniciarSesion();
      } else if (this.formRecovery.valid) {
        this.recuperarPassword();
      }
    }
  }
}
