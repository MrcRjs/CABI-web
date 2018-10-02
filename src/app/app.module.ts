import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AppRoutingModule } from './app-routing.module';

// Componentes
import { LoginComponent } from './login/login.component';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { UsuariosRegisterComponent } from './usuarios-register/usuarios-register.component';

// Modals
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';

// Services
import { ShareLoginService } from './services/shareLogin.service';

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
    LocalStorageModule.withConfig({
      prefix: '',
      storageType: 'localStorage'
    })
  ],
  providers: [ShareLoginService],
  entryComponents: [ModalConfirmComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
