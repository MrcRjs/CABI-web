import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatAutocomplete } from '@angular/material';
import { Bicicletas } from '../marcas-bicicleta';
import { Bicycle } from '../models/bicycle.model';
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
  @ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;
  myAngularxQrCode = '';

  constructor(public dialogRef: MatDialogRef<ModalBikeComponent>,
              public notificacionSnackBar: MatSnackBar) {
                this.bike = new Bicycle();
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

  save() {
    this.notificacionSnackBar.open( this.messageResult, '', {
      duration: 2000,
    } );
    this.dialogRef.close(true);
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

}
