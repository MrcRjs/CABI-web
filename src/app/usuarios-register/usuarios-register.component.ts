import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import { MatSnackBar } from '@angular/material';
// tslint:disable-next-line:import-blacklist
import {map, startWith} from 'rxjs/operators';
import { Bicicletas } from '../marcas-bicicleta';
import { MatAutocomplete, MatDialog } from '@angular/material';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { ModalPhotoComponent } from '../modal-photo/modal-photo.component';
import { User } from '../models/user.model';
import { Bicycle } from '../models/bicycle.model';
import { UserService } from '../services/user.service';
import { BicycleService } from '../services/bicycle.service';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase/app';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';

@Component({
  selector: 'app-usuarios-register',
  templateUrl: './usuarios-register.component.html',
  styleUrls: ['./usuarios-register.component.css']
})
export class UsuariosRegisterComponent implements OnInit {
  myControl = new FormControl();
  userTypes = ['USUARIO', 'ADMINISTRADOR', 'DASU', 'VISITANTE'];
  colores = ['Blanco', 'Verde', 'Azul', 'Rojo', 'Naranja', 'Amarillo', 'Negro'];
  seletedColor = '';
  marcas = Bicicletas;
  seletedMarca = '';
  filteredOptions: Observable<string[]>;
  user: User;
  password = '';
  passwordConfirm = '';
  bike: Bicycle;
  @ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;

  myAngularxQrCode = '';
  saveSuccess = false;

  public webcamImage: WebcamImage = null;

  constructor(public dialog: MatDialog,
              private userService: UserService,
              private bicycleService: BicycleService,
              public notificacionSnackBar: MatSnackBar) {
    this.bike = new Bicycle();
    this.user = new User();
    this.user.tipoCuenta = 'USUARIO';
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.marcas.filter(option => option.toLowerCase().includes(filterValue));
  }

  chooseFirstOption(): void {
    this.matAutocomplete.options.first.select();
  }

  getValue(value) {
    this.bike.marca = value;
  }

  isUser(): boolean {
    // tslint:disable-next-line:triple-equals
    return this.user.tipoCuenta == 'USUARIO';
  }

  isNotEmptyQR() {
    // tslint:disable-next-line:triple-equals
    return this.myAngularxQrCode != '';
  }

  obtenerFechaHora() {
    const currentdate = new Date();
    const datetime = '' + currentdate.getDate()
            + (currentdate.getMonth() + 1)
            + currentdate.getFullYear()
            + currentdate.getHours()
            + currentdate.getMinutes()
            + currentdate.getSeconds();
    return datetime;
  }

  openModal(): void {
    const dialogRef = this.dialog.open( ModalConfirmComponent,
        {
            width: '300px'
        } );
    dialogRef.componentInstance.message = '¿Está seguro de almacenar este usuario?';
    dialogRef.componentInstance.messageResult = 'Usuario almacenado exitosamente.';
    dialogRef.afterClosed()
        .subscribe( result => {
            console.log( 'El Dialogo se cerro' );
            if (result) {
              const secundaryApp = firebase.initializeApp(environment.firebase, 'Secondary');
              secundaryApp.auth().createUserWithEmailAndPassword(this.user.email, this.password).then(credential => {
                secundaryApp.auth().signOut().then(resOut => {
                  this.user.uid = credential.user.uid;
                  this.user.toUpperCase();
                  this.userService.create(this.user).then(resCreateUser => {
                    // tslint:disable-next-line:triple-equals
                    if (this.user.tipoCuenta == 'USUARIO') {
                      this.bike.uid = credential.user.uid;
                      this.bike.id = credential.user.uid + '_' + this.obtenerFechaHora();
                      this.bicycleService.create(this.bike).then(resCreateBike => {
                        this.myAngularxQrCode = this.bike.id;
                        this.saveSuccess = true;
                      }).catch(error => this.sendMessageError(error.message));
                    }
                  }).catch(error => this.sendMessageError(error.message));
                }).catch(error => this.sendMessageError(error.message));
              }).catch(error => this.sendMessageError(error.message));
            }
        } );
  }

  sendMessageError(message) {
    this.notificacionSnackBar.open( message, '', {
      duration: 2000,
    } );
  }

  reset() {
    this.saveSuccess = false;
  }

  openModalPhoto() {
    const dialogRef = this.dialog.open( ModalPhotoComponent,
      {
          panelClass: 'modalPhoto'
      } );

    dialogRef.afterClosed()
      .subscribe( result => {
          console.log( 'El Dialogo se cerro' );
          if (result) {
            this.webcamImage = result;
          }
      });
  }
}
