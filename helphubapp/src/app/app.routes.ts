import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/users/login/login.component';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { VectorsTableComponent } from './components/vectors/vectors-table/vectors-table.component';
import { UserUpdateComponent } from './components/users/user-update/user-update.component';
import { AutenticadoGuard } from './guards/autenticado.guard';

export const routes: Routes = [
    {path : '', component: HomeComponent},
    {path : 'vectors_table',component : VectorsTableComponent, canActivate : [AutenticadoGuard]},
    {path : 'user-register', component : UserRegisterComponent},
    {path : 'user-login', component : LoginComponent},
    {path : 'user-update', component : UserUpdateComponent}
];
