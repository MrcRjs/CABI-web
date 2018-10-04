import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { User } from '../models/user.model';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: firebase.User;
  userName: string;

  constructor(private db: AngularFireDatabase) {}

  getUserByEmail(email) {
    const path = `/usuarios`;
    // tslint:disable-next-line:no-unused-expression
    return this.db.list(path, ref => ref.orderByChild('email').equalTo(email));
  }

  getUser(uid): AngularFireObject<User> {
    const path = `/usuarios/${uid}`;
    return this.db.object<User>(path);
  }

  getUsers() {
    const path = '/usuarios';
    return this.db.list(path);
  }

  create(user: User) {
    const path = `/usuarios/${user.uid}`;
    return this.db.object(path).set(user);
  }

  udate(user: User) {
    const path = `/usuarios/${user.uid}`;
    return this.db.object(path).update(user);
  }

  checkTipoDeCuenta(uid) {
    const path = this.db.database.ref(`/usuarios/${uid}`);
    return path.once('value');
  }
}
