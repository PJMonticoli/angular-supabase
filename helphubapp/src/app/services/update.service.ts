import { Injectable } from '@angular/core';
import { SupabaseClient,createClient } from '@supabase/supabase-js'; // Asegúrate de importar SupabaseAuthClient
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private s_client! : SupabaseClient;
  constructor() {
    this.s_client = createClient(environment.apiUrl,environment.apiKey);
   }

   // Actualizo password user con el link del correo
  async updateUser(email: string, password: string, userData: any): Promise<any> {
    try {
      const { data, error } = await this.s_client.auth.updateUser({
        email: email,
        password: password,
        data: userData
      });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error : any) {
      throw new Error(error.message);
    }
  }
}
