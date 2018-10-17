import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { UploadService } from '../services/upload.service';
import { User } from '../models/user.model';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ModalPhotoComponent } from '../modal-photo/modal-photo.component';
import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.css']
})
export class UsuariosEditComponent implements OnInit {

  userTypes = ['USUARIO', 'ADMINISTRADOR', 'DASU', 'VISITANTE'];
  user: User = new User();
  exist = true;
  webcamImage: WebcamImage = null;
  urlFirebaseImage = '';
  // notHasPhoto, waiting, success
  photoStatus = 'waiting';

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              public notificacionSnackBar: MatSnackBar,
              public uploadService: UploadService,
              private router: Router,
              public dialog: MatDialog) {
    this.user = new User();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['uid'] != null) {
          this.userService.getUser(params['uid']).snapshotChanges().subscribe( user => {
            if (this.exist = user.key != null) {
              const x = user.payload.toJSON();
              this.user = new User(x);
              this.uploadService.getUrl(this.user.uid).subscribe(url => {
                this.urlFirebaseImage = url;
                this.photoStatus = 'success';
              }, error => {
                this.photoStatus = 'notHasPhoto';
                this.sendMessageError(error.message);
              });
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
        if (this.webcamImage) {
          this.uploadService.upload(this.webcamImage, this.user.uid).then(UploadTaskSnapshot => {
            this.sendMessageError('Usuario editado exitosamente.');
            this.router.navigate(['usuarios']);
          }).catch(error => this.sendMessageError(error.message));
        } else {
          this.sendMessageError('Usuario editado exitosamente.');
          this.router.navigate(['usuarios']);
        }
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

  openModalPhoto() {
    const dialogRef = this.dialog.open( ModalPhotoComponent,
      {
          panelClass: 'modalPhoto'
      } );

    dialogRef.afterClosed()
      .subscribe( result => {
          if (result) {
            this.webcamImage = result;
          }
      });
  }

  cancelPhoto() {
    this.webcamImage = null;
  }

  showSpinner() {
    // tslint:disable-next-line:triple-equals
    return this.photoStatus == 'waiting';
  }

  notHasPhoto() {
    // tslint:disable-next-line:triple-equals
    return this.photoStatus == 'notHasPhoto';
  }
}
