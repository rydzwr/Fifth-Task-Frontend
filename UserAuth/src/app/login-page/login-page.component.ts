import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserAuthorizationJsonResponse } from '../model/UserAuthorizationJsonResponse';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit{
  public name = '';
  public surname = '';
  public email = '';

  public userSessionCode = '';

  public status = '';

  constructor(private _service: UserAuthService, private _cookieService: CookieService) {}
  ngOnInit(): void {
    if (this._cookieService.get('userSessionCode').trim() !== '') {
      this.userSessionCode = this._cookieService.get('userSessionCode');
      this._service
          .getUserDetails(this.userSessionCode)
          .subscribe((res: UserAuthorizationJsonResponse) => {
            this.name = res.name;
            this.surname = res.surname;
            this.email = res.email;
          });
    }
  }

  public submitClicked(name: string, password: string) {
    if (name.trim() !== '' && password.trim() !== '') {
      this._service.login(name, password).subscribe((res: string) => {
        this._cookieService.set('userSessionCode', res.toString());
        console.log(this._cookieService.get('userSessionCode'));
        this._service
          .getUserDetails(res)
          .subscribe((res: UserAuthorizationJsonResponse) => {
            this.name = res.name;
            this.surname = res.surname;
            this.email = res.email;
          });
      });
    } else {
      this.status = 'invalidCredentials';
    }
  }

  public clearCookiesClicked() {
    this._cookieService.deleteAll();
  }
}
