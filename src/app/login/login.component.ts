import { Component, OnInit } from '@angular/core';
import { ShareLoginService } from '../services/shareLogin.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private shareLoginService: ShareLoginService,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['usuarios']);
    this.shareLoginService.setLogin(true);
    this.localStorageService.set('logged', true);
  }
}
