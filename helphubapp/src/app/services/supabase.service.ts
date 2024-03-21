import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { SupabaseClient, createClient } from '@supabase/supabase-js';


@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  apiUrl : string = 'https://cinxvmcoxltagqjllntb.supabase.co';
  apiKey : string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpbnh2bWNveGx0YWdxamxsbnRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAzNjg5NDcsImV4cCI6MjAyNTk0NDk0N30.75RrOs3_kXa8VYbJPUW5mP-zIiiw7w7DYrG8jZYodOg';

  private s_client : SupabaseClient;
  constructor(private http: HttpClient) { 
    this.s_client = createClient(this.apiUrl,this.apiKey);
  }

  getVectors() {
    const headers = {
      'apikey': this.apiKey
    };
    return this.http.get(`${this.apiUrl}/rest/v1/vectors_table`, { headers });
  }
}
