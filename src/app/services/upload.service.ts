import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { WebcamImage } from 'ngx-webcam';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;

    constructor(private afStorage: AngularFireStorage) { }

    upload(webcamImage: WebcamImage, id: string) {
      this.ref = this.afStorage.ref(`usuarios/${id}`);
      this.task = this.ref.put(this.convertToFile(webcamImage, id));
      return this.task;
    }

    getUrl(id: string) {
      this.ref = this.afStorage.ref(`usuarios/${id}`);
      return this.ref.getDownloadURL();
    }

    private convertToFile(webcamImage: WebcamImage, filename: string): File {
      const arr = webcamImage.imageAsDataUrl.split(',')[1];
      const mime = 'image/jpeg';
      const bstr = atob(arr);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type: mime});
    }

    // // Writes the file details to the realtime db
    // private saveFileData(upload: Upload) {
    //   this.db.list(`${this.basePath}/`).push(upload);
    // }

    // deleteUpload(upload: Upload) {
    //     this.deleteFileData(upload.$key)
    //     .then( () => {
    //         this.deleteFileStorage(upload.name);
    //     })
    //     .catch(error => console.log(error));
    // }

    // // Deletes the file details from the realtime db
    // private deleteFileData(key: string) {
    //     return this.db.list(`${this.basePath}/`).remove(key);
    // }

    // // Firebase files must have unique names in their respective storage dir
    // // So the name serves as a unique key
    // private deleteFileStorage(name: string) {
    //     const storageRef = firebase.storage().ref();
    //     storageRef.child(`${this.basePath}/${name}`).delete();
    // }
}
