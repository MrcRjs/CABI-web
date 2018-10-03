import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

/*Components App Import*/
import {LoginComponent} from './login/login.component';
import {UsuariosListComponent} from './usuarios-list/usuarios-list.component';
import {UsuariosRegisterComponent} from './usuarios-register/usuarios-register.component';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'usuarios',  canActivate: [AuthGuard], component: UsuariosListComponent},
    {path: 'usuarios/nuevo',  canActivate: [AuthGuard], component: UsuariosRegisterComponent},
    { path: '**', redirectTo: '' }
  ];

  @NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}
