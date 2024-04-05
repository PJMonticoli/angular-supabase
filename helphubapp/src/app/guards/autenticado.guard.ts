import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr'; 
import { SupabaseService } from '../services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoGuard implements CanActivate {

  constructor(private servicioSupabase: SupabaseService, private router: Router, private toastr: ToastrService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.servicioSupabase.isLoggedIn()) {
      return true; 
    } else {
      this.toastr.error("Es necesario iniciar sesión para acceder a este recurso", undefined, {
        timeOut: 3000 // Duración en milisegundos (en este caso, 3 segundos)
      });
      
      this.router.navigate(['/']);
      return false; 
    }
  }
}
