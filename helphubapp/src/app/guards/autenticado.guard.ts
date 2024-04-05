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
      // User is logged in
      const token = this.servicioSupabase.getToken();
      if (token) {
        const body = token.split('.')[1]; 
        const buff = JSON.parse(atob(body));
        if (buff != '') {
          return true;
        } else {
          this.toastr.error("No posee permisos para acceder a este recurso");
          this.router.navigate(['/']);
          return false;
        }
      } else {
        this.toastr.error("Es necesario iniciar sesión para acceder a este recurso");
        this.router.navigate(['/user-login']);
        return false;
      }
    } else {
      this.toastr.error("Es necesario iniciar sesión para acceder a este recurso");
      this.router.navigate(['/user-login']);
      return false;
    }
  }
}
