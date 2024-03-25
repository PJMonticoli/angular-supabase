import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SidenavComponent } from '../../sidenav/sidenav.component';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule,SidenavComponent],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
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
          this.toastr.error("Error al registrarse, revise y complete todos los campos!");
          console.log(err);
        }
      });
    }
  }
}
