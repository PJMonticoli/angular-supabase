import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vectors-table',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vectors-table.component.html',
  styleUrl: './vectors-table.component.css'
})
export class VectorsTableComponent implements OnInit {
  vectors: any[] = [];

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    this.fetchVectors();
  }

  fetchVectors() {
    this.supabaseService.getVectors().subscribe((data: any) => {
      this.vectors = data;
    });
  }

}
