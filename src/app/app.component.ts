import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ShareLoginService } from './services/shareLogin.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { LocalStorageService } from 'angular-2-local-storage';
import { AuthService } from './services/auth.service';

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

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private authService: AuthService,
    private shareLoginService: ShareLoginService,
    private localStorageService: LocalStorageService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    /*
    if (this.localStorageService.get('logged')) {
      this.shareLoginService.setLogin(true);
    }
    this.shareLoginService.loggedSource.subscribe(logged => {
      this.logged = logged;
    });*/
    this.logged = this.authService.isLoggedIn();
    this.Username = this.authService.currentUserDisplayName;
  }

  logout() {
    this.sidenav.close();
//    this.shareLoginService.setLogin(false);
//    this.authService.logout();
    this.router.navigate(['login']);
//    this.localStorageService.clearAll();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
