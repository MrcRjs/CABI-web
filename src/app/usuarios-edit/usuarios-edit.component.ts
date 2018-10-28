import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { BicycleService } from '../services/bicycle.service';
import { UploadService } from '../services/upload.service';
import { User } from '../models/user.model';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ModalPhotoComponent } from '../modal-photo/modal-photo.component';
import { ModalBikeComponent } from '../modal-bike/modal-bike.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { WebcamImage } from 'ngx-webcam';
import { Bicycle } from '../models/bicycle.model';

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

  bikes: Bicycle[];
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private bicycleService: BicycleService,
              public notificacionSnackBar: MatSnackBar,
              public uploadService: UploadService,
              private router: Router,
              public dialog: MatDialog) {
    this.user = new User();
    this.bikes = [];
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

                this.bicycleService.getBicycle(this.user.uid).snapshotChanges().subscribe( bikes => {
                  this.bikes = [];
                  // tslint:disable-next-line:forin
                  for (const key in bikes.payload.toJSON()) {
                    const bike = bikes.payload.toJSON()[key];
                    this.bikes.push(bike);
                  }
                });

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
            this.photoStatus = 'success';
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

  openModalBike(bike?: Bicycle) {
    const dialogRef = this.dialog.open( ModalBikeComponent,
      {
          panelClass: 'modalBike'
      } );
      dialogRef.componentInstance.uid = this.user.uid;
      if (bike) {
        dialogRef.componentInstance.bike = bike;
        dialogRef.componentInstance.myAngularxQrCode = bike.id;
      }
    dialogRef.afterClosed()
      .subscribe( result => {
        console.log(result);
      });
  }

  removeBike(bike: Bicycle) {
    const dialogRef = this.dialog.open( ModalConfirmComponent,
      {
          width: '300px'
      } );
      dialogRef.componentInstance.message = '¿Está seguro de eliminar remover esta bicicleta?';
      dialogRef.componentInstance.messageResult = 'Bicicleta removida exitosamente.';
    dialogRef.afterClosed()
        .subscribe( result => {
          if (result) {
            this.bicycleService.remove(bike).then(resRemoveBike => {
              this.sendMessageError('Bicicleta eliminada exitosamente.');
            }).catch(error => this.sendMessageError(error.message));
          }
        });
  }

  bikesFull() {
    // tslint:disable-next-line:triple-equals
    return this.bikes.length == 3;
  }
}
