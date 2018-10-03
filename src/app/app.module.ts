import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

// Componentes
import { LoginComponent } from './login/login.component';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { UsuariosRegisterComponent } from './usuarios-register/usuarios-register.component';

// Modals
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';

// Services
import { ShareLoginService } from './services/shareLogin.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from 'app/services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuariosListComponent,
    UsuariosRegisterComponent,
    // Modals
    ModalConfirmComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({appId: 'my-app'}),
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LocalStorageModule.withConfig({
      prefix: '',
      storageType: 'localStorage'
    })
  ],
  providers: [AuthService, AuthGuard, ShareLoginService],
  entryComponents: [ModalConfirmComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
