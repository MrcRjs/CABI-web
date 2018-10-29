import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatAutocomplete } from '@angular/material';
import { Bicicletas } from '../marcas-bicicleta';
import { Bicycle } from '../models/bicycle.model';
import { BicycleService } from '../services/bicycle.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-modal-bike',
  templateUrl: './modal-bike.component.html',
  styleUrls: ['./modal-bike.component.css']
})
export class ModalBikeComponent implements OnInit {
  myControl = new FormControl();
  messageResult = 'Bicicleta agregada exitosamente.';
  colores = ['Blanco', 'Verde', 'Azul', 'Rojo', 'Naranja', 'Amarillo', 'Negro'];
  seletedColor = '';
  marcas = Bicicletas;
  seletedMarca = '';
  filteredOptions: Observable<string[]>;
  bike: Bicycle;
  uid: string;
  @ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;
  myAngularxQrCode = '';
  tooltip: string;

  constructor(public dialogRef: MatDialogRef<ModalBikeComponent>,
              public bicycleService: BicycleService,
              public notificacionSnackBar: MatSnackBar) {
                this.bike = new Bicycle();
              }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    // tslint:disable-next-line:triple-equals
    this.tooltip = this.bike.uid == '' ? 'Save bike' : 'Edit bike';
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.marcas.filter(option => option.toLowerCase().includes(filterValue));
  }

  save() {
    console.log('SAVE() ---> ModalBike.');
    console.log(this.bike);
    // tslint:disable-next-line:triple-equals
    if (this.bike.id && this.bike.id != '') {
      this.bicycleService.udate(this.bike).then(resUpdateBike => {
        this.sendMessageError('Bicicleta editada exitosamente.');
      }).catch(error => this.sendMessageError(error.message));
    } else {
      this.tooltip = 'Edit bike';
      this.bike.uid = this.uid;
      this.bike.id = this.uid + '_' + this.obtenerFechaHora();
      this.bicycleService.create(this.bike).then(resCreateBike => {
        this.myAngularxQrCode = this.bike.id;
        this.sendMessageError('Bicicleta agregada exitosamente.');
        console.log('Bicicleta agregada exitosamente.');
      }).catch(error => this.sendMessageError(error.message));
    }
    // this.dialogRef.close();
  }

  chooseFirstOption(): void {
    this.matAutocomplete.options.first.select();
  }

  getValue(value) {
    this.bike.marca = value;
  }

  isNotEmptyQR() {
    // tslint:disable-next-line:triple-equals
    return this.myAngularxQrCode != '';
  }

  sendMessageError(message) {
    this.notificacionSnackBar.open( message, '', {
      duration: 2000,
    } );
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
}
