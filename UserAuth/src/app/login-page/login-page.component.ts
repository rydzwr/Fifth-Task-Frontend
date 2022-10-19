import { Component } from '@angular/core';
import { UserAuthorizationJsonResponse } from '../model/UserAuthorizationJsonResponse';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  public response: undefined | UserAuthorizationJsonResponse = {
    name: '',
    surname: '',
    email: ''
  };
  public name = '';
  public surname = '';
  public email = '';

  public userSessionCode = '';

  public status = '';

  constructor(private _service: UserAuthService) {}

  public submitClicked(name: string, password: string) {
    console.log('Name: -> ' + name);
    console.log('Password: -> ' + password);
    if (name.trim() !== '' && password.trim() !== '') {
      this._service.login(name, password).subscribe((res: string) => {
        this.userSessionCode = res;
        console.log(this.userSessionCode);
      })
    } else {
        this.status = 'invalidCredentials';
    }
    this._service.getUserDetails(this.userSessionCode).subscribe((details: UserAuthorizationJsonResponse) => {
      this.name = details.name;
      this.surname = details.surname;
      this.email = details.email;
      console.log('details.name: ->  ' + details.name)
    })
  }
}
