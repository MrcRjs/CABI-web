import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalConfirmComponent>,
              public notificacionSnackBar: MatSnackBar,
              private router: Router,
              @Inject( MAT_DIALOG_DATA ) public data: any) { }

  ngOnInit() {
  }

  save() {
    this.notificacionSnackBar.open( 'Operación exitosa.', '', {
      duration: 2000,
    } );
    this.dialogRef.close();
    this.router.navigate(['usuarios']);
  }

  cancel() {
    this.dialogRef.close();
  }
}
