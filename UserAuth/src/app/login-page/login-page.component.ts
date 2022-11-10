import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonResponse } from '../model/JsonResponse';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  public status = '';

  constructor(
    private _service: UserAuthService,
    private _router: Router
  ) {}
  ngOnInit(): void {
  }

  public submitClicked(name: string, password: string) {
    if (name.trim() !== '' && password.trim() !== '') {
      this._service.login(name, password).subscribe((res: JsonResponse) => {
        const route = res.role === "admin" ? "admin" : "user";
          this._router.navigate([route]);
      });
    } else {
      this.status = 'invalidCredentials';
    }
  }
}
