import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { InsertVectorsComponent } from '../insert-vectors/insert-vectors.component';
import { UpdateVectorsComponent } from '../update-vectors/update-vectors.component';


@Component({
  selector: 'app-vectors-table',
  standalone: true,
  imports: [RouterLink,MatPaginatorModule,InsertVectorsComponent,UpdateVectorsComponent],
  templateUrl: './vectors-table.component.html',
  styleUrl: './vectors-table.component.css'
})
export class VectorsTableComponent implements OnInit {
  vectors: any[] = [];
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
    } else {
      console.error('User ID not available');
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
  
}
