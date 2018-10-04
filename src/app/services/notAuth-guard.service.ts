import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
// tslint:disable-next-line:import-blacklist
import { take, map, tap } from 'rxjs/operators';

@Injectable()
export class NotAuthGuardService implements CanActivate {
    constructor( public authService: AuthService, public router: Router ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.authService.afAuth.authState.pipe(take(1), map(authState => !authState), tap(loggedIn => {
            if (!loggedIn) {
            console.log('access denied');
            this.router.navigate(['usuarios']);
            }
        }));
    }
}
