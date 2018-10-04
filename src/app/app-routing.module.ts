import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { NotAuthGuardService as NotAuthGuard } from './services/notAuth-guard.service';

/*Components App Import*/
import {LoginComponent} from './login/login.component';
import {UsuariosListComponent} from './usuarios-list/usuarios-list.component';
import {UsuariosRegisterComponent} from './usuarios-register/usuarios-register.component';
import {UsuariosEditComponent} from './usuarios-edit/usuarios-edit.component';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
    {path: 'usuarios', component: UsuariosListComponent, canActivate: [AuthGuard]},
    {path: 'usuarios/nuevo', component: UsuariosRegisterComponent, canActivate: [AuthGuard]},
    {path: 'usuarios/editar/:uid', component: UsuariosEditComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '' }
  ];

  @NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}
