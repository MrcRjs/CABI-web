import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'tipo', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
  }

  add() {
    this.router.navigate(['usuarios/nuevo']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  hola(id) {
    alert(id);
  }

  delete(id) {
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

export interface PeriodicElement {
  name: string;
  position: number;
  tipo: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'FRANCISCO OLIVERAS BELLO', tipo: 'usuario'},
  {position: 2, name: 'SAMUEL MONEDERO ARTOLA', tipo: 'visitante'},
  {position: 3, name: 'MOHAMED BECERRA GALLARDO', tipo: 'usuario'},
  {position: 4, name: 'VERONICA SALIDO RUBIALES', tipo: 'usuario'},
  {position: 5, name: 'ANDRES AZCONA CALLEJAS', tipo: 'usuario'},
  {position: 6, name: 'MARIA CONCEPCION MELENDEZ CALERO', tipo: 'admin'},
  {position: 7, name: 'CRISTINA DURO TERRON', tipo: 'DASU'},
  {position: 8, name: 'SERGIO VERDU MENGUAL', tipo: 'usuario'},
  {position: 9, name: 'LUISA MAYORAL GABARRI', tipo: 'visitante'},
  {position: 10, name: 'GABRIEL CERDA SANCHIS', tipo: 'usuario'}
];
