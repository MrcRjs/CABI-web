import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.css']
})
export class UsuariosEditComponent implements OnInit {

  userTypes = ['USUARIO', 'ADMINISTRADOR', 'DASU', 'VISITANTE'];
  user: User = new User();
  exist = true;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              public notificacionSnackBar: MatSnackBar,
              private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['uid'] != null) {
          this.userService.getUser(params['uid']).snapshotChanges().subscribe( user => {
            if (this.exist = user.key != null) {
              const x = user.payload.toJSON();
              this.user = new User(x);
            } else {
              this.sendMessageError('El usuario no existe.');
            }
          }, error => {
            this.sendMessageError(error.message);
          });
      }
    });
  }

  update() {
    if (this.exist) {
      this.user.toUpperCase();
      this.userService.udate(this.user).then( res => {
        this.sendMessageError('Usuario editado exitosamente.');
        this.router.navigate(['usuarios']);
      }).catch(error => { this.sendMessageError(error.message); });
    } else {
      this.sendMessageError('El usuario a editar no existe.');
    }
  }

  sendMessageError(message) {
    this.notificacionSnackBar.open( message, '', {
      duration: 2000,
    } );
  }
}
