import { Component, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

import { SupabaseService } from '../../../services/supabase.service';
import { DeleteVectorsComponent } from '../delete-vectors/delete-vectors.component';
import { UpdateVectorsComponent } from '../update-vectors/update-vectors.component';
import { InsertVectorsComponent } from '../insert-vectors/insert-vectors.component';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-vectors-table',
  standalone: true,
  imports: [RouterLink,MatPaginatorModule,InsertVectorsComponent,UpdateVectorsComponent,DeleteVectorsComponent,FormsModule],
  templateUrl: './vectors-table.component.html',
  styleUrl: './vectors-table.component.css'
})
export class VectorsTableComponent implements OnInit {
  vectors: any[] = [];
  filtroTexto: string = '';
  page: number = 0; 
  pageSize: number = 7; 
  constructor(private supabaseService : SupabaseService,private toastr : ToastrService){}

  ngOnInit(): void {
    this.fetchVectorsForCurrentUser();
  }

  fetchVectorsForCurrentUser() {
    const user_id = this.supabaseService.getUserId();
    if (user_id) {
      this.supabaseService.getVectorsByUserId(user_id).subscribe((data: any) => {
        this.vectors = data;
      });
    }
  }

  onPageChange(event: any): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  getPaginatedList(): any {
    const startIndex = this.page * this.pageSize;
    return this.vectors.slice(startIndex, startIndex + this.pageSize);
  } 
  
  filtrarTabla(): void {
    const filtro = this.normalizeString(this.filtroTexto);
  
    if (filtro.trim() === '') {
      this.fetchVectorsForCurrentUser();
    } else {
      this.vectors = this.vectors.filter(row =>
        this.normalizeString(row.pregunta)?.includes(filtro) || 
        this.normalizeString(row.respuesta)?.includes(filtro)
      );
      this.page = 0;
    }
  }
  
  
  normalizeString(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }
  
}
