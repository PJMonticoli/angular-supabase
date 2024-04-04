import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  @Input() modalId: number = 1;
  mostrarCheckboxTerminos: boolean = false;
  @Output() userAuthenticated = new EventEmitter<any>();
  constructor(
    private formBuilder: FormBuilder,
    private servicioSupabase : SupabaseService,
    private router : Router,
    private toastr : ToastrService,
    private route: ActivatedRoute
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
  
      // Verifica si se obtuvo el token de la URL correctamente
      if (tokenFromURL) {
        const userData = {
          email: email,
          password: password
        };
  
        // Llama a updateUser utilizando el token de la URL
        this.servicioSupabase.updateUser(email, password, userData, tokenFromURL).subscribe({
          next: (response: any) => {
            this.toastr.success('Contraseña cambiada con éxito!');
            this.servicioSupabase.setUser(response.user.id);
            this.router.navigate(['/user-login']);
          },
          error: (err) => {
            this.toastr.error('Error al cambiar la contraseña. Por favor, intenta nuevamente.');
            console.error(err);
          }
        });
      } else {
        this.toastr.error('No se pudo obtener el token de la URL. Por favor, intenta nuevamente.');
      }
    } else {
      this.toastr.error('Por favor, completa todos los campos correctamente.');
    }
  }
  
  getTokenFromURL(): string | null {
    // Obtener la URL actual
    const currentUrl = window.location.href;
    
    // Buscar el índice del signo "#" en la URL
    const hashIndex = currentUrl.indexOf('#');
    
    // Si se encuentra el signo "#"
    if (hashIndex !== -1) {
      // Obtener la parte de la URL después del signo "#"
      const fragment = currentUrl.substring(hashIndex + 1);
      
      // Buscar el índice del signo "=" en la parte del fragmento de la URL
      const tokenIndex = fragment.indexOf('=');
      
      // Si se encuentra el signo "="
      if (tokenIndex !== -1) {
        // Devolver el token que está después del signo "="
        return fragment.substring(tokenIndex + 1);
      }
    }
    
    // Si no se encuentra el token, devolver null
    return null;
  }
  

  
}
