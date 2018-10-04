import { Component, OnInit } from '@angular/core';
import { ShareLoginService } from '../services/shareLogin.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  pass = '';

  constructor(private router: Router,
              private shareLoginService: ShareLoginService,
              private localStorageService: LocalStorageService,
              private authService: AuthService,
              private userService: UserService,
              public notificacionSnackBar: MatSnackBar) { }

  ngOnInit() {
  }

  login() {
    // this.userService.getUserByEmail(this.email).snapshotChanges().subscribe(
    //   res => {
    //     console.log(res);
    //   }
    // );
    this.authService.login(this.email, this.pass).then((user) => {
      if (user.user) {
        this.userService.checkTipoDeCuenta(user.user.uid).then(snapshot => {
          if (snapshot.exists()) {
            const tipoDeCuenta = (snapshot.val() && snapshot.val().tipoCuenta) || 'Anonymous';
            switch (tipoDeCuenta) {
              case 'ADMINISTRADOR':
                this.shareLoginService.setLogin(true);
                this.sendMessageError(`Autenticación exitosa.`);
                this.router.navigate(['usuarios']);
                break;
              default:
                this.sendMessageError(`Autenticación exitosa pero sin acceso.`);
                this.authService.logout();
                break;
            }
          }
        });
      }
    })
    .catch(error => this.sendMessageError(error.message));
  }

  sendMessageError(message) {
    this.notificacionSnackBar.open( message, '', {
      duration: 2000,
    } );
  }
}
