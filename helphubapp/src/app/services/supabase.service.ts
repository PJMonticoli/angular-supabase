import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';




@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  user_id: string | undefined; 

  constructor(private http: HttpClient) {}


  //CRUD USER

  //GET usuario por id 
  getVectorsByUserId(user_id: string): Observable<any> {
    const headers = {
      'apikey': environment.apiKey,
      'Authorization': `Bearer ${this.getToken()}`
    };
    return this.http.get(`${environment.apiUrl}/rest/v1/vectors_table?user_id=eq.${user_id}`, { headers });
  }

  //Iniciar Sesión
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


  // Registrarse
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

  // Cerrar Sesión
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

  // Recuperar Contraseña
  recoverPassword(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'apikey': environment.apiKey,
      'Content-Type': 'application/json'
    });

    const body = {
      email: email
    };

    return this.http.post(`${environment.apiUrl}/auth/v1/recover`, body, { headers });
  }

  // Actualizar usuario

updateUser(email: string, password: string, userData: any, token: string): Observable<any> {
  const headers = new HttpHeaders({
    'apikey': environment.apiKey,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  const body = {
    email: email,
    password: password,
    data: userData
  };

  return this.http.put(`${environment.apiUrl}/auth/v1/user`, body, { headers });
}



  // Limpiar Sesión 
  private clearSession(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
  }

  // GET - SET manejo sesión y tokens
  

setToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', token);
  }
}

getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
}

  
setUser(user_id: string): void {
  this.user_id = user_id;
  localStorage.setItem('user_id', user_id);
}
  
getUserId(): string | undefined {
    return this.user_id;
 }


isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // CRUD VECTORS_TABLE

  // Registrar vector
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

// Modificar vector
modificar(vectorId: number, vectorDataUpdated: any): Observable<any> {
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
    ...vectorDataUpdated,
    user_id: user_id
  };

  return this.http.patch(`${environment.apiUrl}/rest/v1/vectors_table?id=eq.${vectorId}`, vectorDataWithUserId, { headers });
}

// Eliminar vector
deleteVector(vectorId: any): Observable<any> {
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
    'Authorization': `Bearer ${token}`
  });

  return this.http.delete(`${environment.apiUrl}/rest/v1/vectors_table?id=eq.${vectorId}`, { headers });
}


}
