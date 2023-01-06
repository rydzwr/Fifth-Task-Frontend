import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  public status = '';

  constructor(private _service: UserAuthService, private _router: Router) {}
  ngOnInit(): void {}

  public async submitLoginClicked(name: string, password: string) {
    if (name.trim() === '' || password.trim() === '') {
      this.status = 'validationErr';
      return;
    }

    try {
      const loggedIn = await this._service.login(name, password);
      if (loggedIn) {
        const route = this._service.role === 'ADMIN' ? 'admin' : 'user';
        this._router.navigate([route]);
      } else {
        this.status = 'invalidCredentials';
      }
    } catch (err) {
      this.status = 'networkErr';
    }
  }

  public async submitRegisterClicked(name: string, password: string) {
    if (name.trim() === '' || password.trim() === '') {
      this.status = 'validationErr';
      return;
    }

    try {
      const loggedIn = await this._service.register(name, password);

      if (loggedIn) {
        this.status = "welcome";
      } else {
        this.status = 'invalidCredentials';
      }
    } catch (err) {
      this.status = 'duplicate';
    }
  }
}
