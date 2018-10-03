import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
	private user: Observable<firebase.User>;
    private userDetails: firebase.User = null;

    constructor(private _firebaseAuth: AngularFireAuth, private router: Router) { 
        this.user = _firebaseAuth.authState;
        this.user.subscribe(
            (user) => {
                if (user) {
                    this.userDetails = user;
                    console.log(this.userDetails);
                }
                else {
                    this.userDetails = null;
                }
            }
            );
    }

    signInWithGoogle() {
        return this._firebaseAuth.auth.signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
            )
    }


    isLoggedIn() {
        return this.userDetails !== null; 
    }

    get currentUser(): any {
    return this.isLoggedIn() ? this.userDetails : null;
    }

    get currentUserDisplayName(): string {
        if (!this.isLoggedIn()) { return 'Guest' }
        else { return this.userDetails['displayName'] || 'Anónimo' }
    }

    logout() {
        this._firebaseAuth.auth.signOut()
        .then((res) => this.router.navigate(['/']));
    }
}