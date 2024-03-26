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
    this.fetchVectors();
  }

  fetchVectors() {
    this.supabaseService.getVectors().subscribe((data: any) => {
      this.vectors = data;
    });
  }
  onPageChange(event: any): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  getPaginatedList(): any {
    const startIndex = this.page * this.pageSize;
    return this.vectors.slice(startIndex, startIndex + this.pageSize);
  } 
  cerrarSesion(){
    //  this.supabaseService.logout().then((response : any) => {
    //   console.log(response);
    //   this.toastr.success("Cerró Sesión con éxito");
    // }).catch((error : any) => {
    //   console.error(error);
    //   this.toastr.error("Ocurrió un error al intentar Cerrar Sesión");
    // });
  }
}
