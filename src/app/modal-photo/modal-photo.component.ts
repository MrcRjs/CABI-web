import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-modal-photo',
  templateUrl: './modal-photo.component.html',
  styleUrls: ['./modal-photo.component.css']
})
export class ModalPhotoComponent implements OnInit {

  messageResult = 'Foto tomada exitosamente.';

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  private width = 340;
  private height = 460;

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    const win = !!event ? (event.target as Window) : window;
    // this.width = win.innerWidth - 150;
    // this.height = win.innerHeight  - 150;
    // console.log(this.width);
    // console.log(this.height);
    if (win.innerWidth >= 768) {
      this.width = 500;
      this.height = 375;
    } else {
      this.width = 340;
      this.height = 460;
    }
  }

  constructor(public dialogRef: MatDialogRef<ModalPhotoComponent>,
              public notificacionSnackBar: MatSnackBar,
              @Inject( MAT_DIALOG_DATA ) public data: any) {
                this.onResize();
              }

  ngOnInit() {
  }

  save() {
    this.notificacionSnackBar.open( this.messageResult, '', {
      duration: 2000,
    } );
    this.dialogRef.close(this.webcamImage);
  }

  cancel() {
    this.dialogRef.close(null);
  }

  photo() {
    this.trigger.next();
  }

  newPhoto() {
    this.webcamImage = null;
  }

  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  pictureExist() {
      return this.webcamImage != null;
  }
}
