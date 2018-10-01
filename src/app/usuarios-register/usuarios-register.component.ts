import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Bicicletas } from '../marcas-bicicleta';
import { MatAutocomplete, MatDialog } from '@angular/material';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-usuarios-register',
  templateUrl: './usuarios-register.component.html',
  styleUrls: ['./usuarios-register.component.css']
})
export class UsuariosRegisterComponent implements OnInit {
  myControl = new FormControl();
  userTypes = ['Usuario', 'Admin', 'DASU', 'Visitante'];
  userType = 'Usuario';
  colores = ['Blanco', 'Verde', 'Azul', 'Rojo', 'Naranja', 'Amarillo', 'Negro'];
  seletedColor = '';
  marcas = Bicicletas;
  seletedMarca = '';
  filteredOptions: Observable<string[]>;
  @ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;

  constructor(public dialog: MatDialog) { }

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
    this.seletedMarca = value;
  }

  isUser(): boolean {
    // tslint:disable-next-line:triple-equals
    return this.userType == 'Usuario';
  }

  openModal(): void {
    const dialogRef = this.dialog.open( ModalConfirmComponent,
        {
            width: '300px'
        } );

    dialogRef.afterClosed()
        .subscribe( result => {
            console.log( 'El Dialogo se cerro' );
        } );
  }
}
