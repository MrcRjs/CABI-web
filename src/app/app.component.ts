import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ShareLoginService } from './services/shareLogin.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { LocalStorageService } from 'angular-2-local-storage';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  logged = false;
  Username = '';
  mobileQuery: MediaQueryList;
  @ViewChild('snav') sidenav: MatSidenav;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private shareLoginService: ShareLoginService,
              private localStorageService: LocalStorageService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user) {
        this.shareLoginService.setLogin(true);
        this.userService.checkTipoDeCuenta(user.uid);
        this.userService.getUser(user.uid).snapshotChanges().subscribe(a => {
          const y = a.payload.toJSON() as User;
          this.Username = y.nombre;
      });
      } else {
        this.shareLoginService.setLogin(false);
      }
    });

    this.shareLoginService.loggedSource.subscribe(logged => {
      this.logged = logged;
    });
  }

  logout() {
    this.authService.logout().then(res => {
      console.log(res);
      this.sidenav.close();
      this.shareLoginService.setLogin(false);
      this.router.navigate(['login']);
    })
    .catch(error => console.log(error));
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
