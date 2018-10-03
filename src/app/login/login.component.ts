import { Component, OnInit } from '@angular/core';
import { ShareLoginService } from '../services/shareLogin.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = null;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  signInWithGoogle() {
      this.authService.signInWithGoogle()
      .then((res) => {
          this.router.navigate(['/usuarios'])
        })
      .catch((err) => console.log(err));
    }

  ngOnInit() {
  }

}
