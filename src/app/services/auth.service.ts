import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<firebase.User>;
  private authState: any;

  constructor(public afAuth: AngularFireAuth,
              private db: AngularFireDatabase) {
                this.user = afAuth.authState;
              }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }
  /*
  signInWithGoogle() {
      return this._firebaseAuth.auth.signInWithPopup(
          new firebase.auth.GoogleAuthProvider()
          )
  }*/
  
  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
