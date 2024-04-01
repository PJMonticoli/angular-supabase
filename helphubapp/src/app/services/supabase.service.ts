import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';


import { SupabaseClient,createClient } from '@supabase/supabase-js'; // Asegúrate de importar SupabaseAuthClient
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';




@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
 
  user_id: string | undefined; 
  private s_client! : SupabaseClient;


  constructor(private http: HttpClient) { 
    //SI yo agrego esta linea en el constructor,al intentar inyectar la dependencia del serivicio SupabaseService en mi componente
    // sidenav.component.ts, la pagina web deja de cargarse en el navegador al ejecutar en consola "ng serve -o" queda cargando y no finaliza su carga
   //this.s_client = createClient(environment.apiUrl,environment.apiKey);

  }



  getVectorsByUserId(user_id: string): Observable<any> {
    const headers = {
      'apikey': environment.apiKey,
      'Authorization': `Bearer ${this.getToken()}`
    };
    return this.http.get(`${environment.apiUrl}/rest/v1/vectors_table?user_id=eq.${user_id}`, { headers });
  }

  
  signIn(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'apikey': environment.apiKey,
      'Content-Type': 'application/json'
    });
  
    const body = {
      email: email,
      password: password
    };
  
    return this.http.post(`${environment.apiUrl}/auth/v1/token?grant_type=password`, body, { headers }).pipe(
      tap((response: any) => {
        this.setUser(response.user.id); 
        this.setToken(response.access_token);
      }
    ));
  }

  setToken(token: string): void {
    localStorage.setItem('access_token', token);
}

  signUp(email: string, password: string) {
    const headers = new HttpHeaders({
      'apikey': environment.apiKey,
      'Content-Type': 'application/json'
    });

    const body = {
      email: email,
      password: password
    };

    return this.http.post(`${environment.apiUrl}/auth/v1/signup`, body, { headers });
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders({
      'apikey': environment.apiKey,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.post(`${environment.apiUrl}/auth/v1/logout`, null, { headers }).pipe(
      tap(() => {
        this.clearSession();
      })
    );
  }

  
  private clearSession(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
  }

  insert(vectorData: any): Observable<any> {
    const user_id = this.getUserId(); 
    if (!user_id) {
      throw new Error('El usuario no está autenticado.');
    }

    const token = this.getToken(); 
    if (!token) {
      throw new Error('El token de acceso no está disponible.');
    }

    const headers = new HttpHeaders({
      'apikey': environment.apiKey,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });

    const vectorDataWithUserId = {
      ...vectorData,
      user_id: user_id
    };

    return this.http.post(`${environment.apiUrl}/rest/v1/vectors_table`, vectorDataWithUserId, { headers });
}

getToken(): string | null {
    return localStorage.getItem('access_token');
}

  
setUser(user_id: string): void {
  this.user_id = user_id;
  localStorage.setItem('user_id', user_id);
}
  
  getUserId(): string | undefined {
    return this.user_id;
  }


  // modificar(vectorId: string, vectorDataUpdated: any): Observable<any> {
  //   const user_id = this.getUserId(); 
  //   if (!user_id) {
  //     throw new Error('El usuario no está autenticado.');
  //   }
  
  //   const headers = new HttpHeaders({
  //     'apikey': environment.apiKey,
  //     'Content-Type': 'application/json'
  //   });
  
  //   const vectorDataWithUserId = {
  //     ...vectorDataUpdated,
  //     user_id: user_id
  //   };
  
  //   return this.http.put(`${environment.apiUrl}/rest/v1/vectors_table/${vectorId}`, vectorDataWithUserId, { headers });
  // }
  
}
