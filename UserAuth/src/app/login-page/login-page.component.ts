import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  public name = '';
  public surname = '';
  public email = '';

  public userSessionCode = '';

  public status = '';

  public isLoggedIn = false;

  constructor(
    private _service: UserAuthService,
    private _router: Router
  ) {}
  ngOnInit(): void {
  }

  public submitClicked(name: string, password: string) {
    if (name.trim() !== '' && password.trim() !== '') {
      this._service.login(name, password).subscribe((res: string) => {
        console.log(res);
      });
    } else {
      this.status = 'invalidCredentials';
    }
  }
}
