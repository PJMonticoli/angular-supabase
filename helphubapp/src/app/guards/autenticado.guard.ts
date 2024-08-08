import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SupabaseService } from '../services/supabase.service';
// import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root',
})
export class AutenticadoGuard implements CanActivate {
  constructor(
    private servicioSupabase: SupabaseService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.servicioSupabase.isLoggedIn()) {
      return true;
    } else {
      // Swal.fire({
      //   title: 'Atención!',
      //   text: 'Necesitas iniciar sesión para acceder a este recurso',
      //   icon: 'info',
      // });
      this.toastr.info(
        'Necesitas iniciar sesión para acceder a este recurson',
        'Atención!',
        { timeOut: 1500 }
      );
      this.router.navigate(['/user-login']);
      return false;
    }
  }
}
