import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VectorsTableComponent } from './components/vectors-table/vectors-table.component';

export const routes: Routes = [
    {path : '', component: HomeComponent},
    {path : 'vectors_table',component : VectorsTableComponent}
];
