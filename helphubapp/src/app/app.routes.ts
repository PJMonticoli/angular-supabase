import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VectorsTableComponent } from './components/vectors-table/vectors-table.component';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';

export const routes: Routes = [
    {path : '', component: HomeComponent},
    {path : 'vectors_table',component : VectorsTableComponent},
    {path : 'user-register', component : UserRegisterComponent}
];
