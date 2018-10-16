import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { QRCodeModule } from 'angularx-qrcode';
import {WebcamModule} from 'ngx-webcam';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Componentes
import { LoginComponent } from './login/login.component';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { UsuariosRegisterComponent } from './usuarios-register/usuarios-register.component';
import { UsuariosEditComponent } from './usuarios-edit/usuarios-edit.component';

// Modals
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { ModalPhotoComponent } from './modal-photo/modal-photo.component';

// Services
import { ShareLoginService } from './services/shareLogin.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { NotAuthGuardService as NotAuthGuard } from './services/notAuth-guard.service';
import { UserService } from './services/user.service';
import { BicycleService } from './services/bicycle.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuariosListComponent,
    UsuariosRegisterComponent,
    UsuariosEditComponent,
    // Modals
    ModalConfirmComponent,
    ModalPhotoComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    BrowserModule.withServerTransition({appId: 'my-app'}),
    MaterialModule,
    BrowserAnimationsModule,
    LocalStorageModule.withConfig({
      prefix: '',
      storageType: 'localStorage'
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    QRCodeModule,
    WebcamModule
  ],
  providers: [
    ShareLoginService,
    AuthService,
    AuthGuard,
    NotAuthGuard,
    UserService,
    BicycleService
  ],
  entryComponents: [ModalConfirmComponent, ModalPhotoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
