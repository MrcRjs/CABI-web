import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {
  userList: User[] = [];
  displayedColumns: string[] = ['position', 'nombre', 'email', 'tipoCuenta', 'actions'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private router: Router,
              public dialog: MatDialog,
              public userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().snapshotChanges().subscribe(user => {
      this.userList = [];
      user.forEach(element => {
        const x = element.payload.toJSON();
        this.userList.push(x as User);
        this.dataSource = new MatTableDataSource(this.userList);
        this.dataSource.filterPredicate = (data: User, filter: string) => {
          const nombre = data.nombre.trim().toLowerCase().startsWith(filter);
          const aP = data.aP.trim().toLowerCase().startsWith(filter);
          const aM = data.aM.trim().toLowerCase().startsWith(filter);
          const email = data.email.trim().toLowerCase().startsWith(filter);
          const tipoCuenta = data.tipoCuenta.trim().toLowerCase().startsWith(filter);
          return nombre || aP || aM || email || tipoCuenta;
        };
      });
    });
  }

  add() {
    this.router.navigate(['usuarios/nuevo']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id) {
    const dialogRef = this.dialog.open( ModalConfirmComponent,
      {
          width: '300px'
      } );
      dialogRef.componentInstance.message = '¿Está seguro de eliminar este usuario?';
      dialogRef.componentInstance.messageResult = 'Usuario eliminado exitosamente.';
    dialogRef.afterClosed()
        .subscribe( result => {
            console.log( 'El Dialogo se cerro' );
        } );
  }
}
