import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/users/login/login.component';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { VectorsTableComponent } from './components/vectors/vectors-table/vectors-table.component';

export const routes: Routes = [
    {path : '', component: HomeComponent},
    {path : 'vectors_table',component : VectorsTableComponent},
    {path : 'user-register', component : UserRegisterComponent},
    {path : 'user-login', component : LoginComponent}
];
