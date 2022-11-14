import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { UserAuth } from '../model/UserAuth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService implements CanActivate {
  private _loggedIn;
  private _username;
  private _role;

  public get loggedIn() {
    return this._loggedIn;
  }

  public get username() {
    return this._username;
  }

  public get role() {
    return this._role;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('SERVER_URL') private url: String
  ) {
    this._loggedIn = sessionStorage.getItem("loggedIn") ? true : false;
    this._username = sessionStorage.getItem("username") ?? "";
    this._role = sessionStorage.getItem("role") ?? "";
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this._loggedIn) {
      this.router.navigateByUrl('/login');
      return false;
    }

    if (this._role !== route.data['role']) {
      this.router.navigateByUrl('/forbidden');
      return false;
    }

    return true;
  }

  public login(name: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http
        .get<UserAuth>(`${this.url}/api/v1/login`, {
          withCredentials: true,
          headers: new HttpHeaders({
            Authorization: 'Basic ' + btoa(`${name}:${password}`),
            'X-Requested-With': 'XMLHttpRequest',
          }),
        })
        .pipe(
          catchError((err) => {
            const httpErr = err as HttpErrorResponse;
            if (httpErr.status === 0) {
              console.log('Network error occured!');
              reject();
            } else if (httpErr.status === 401) {
              console.log('Invalid credentials!');
              resolve(false);
            } else {
              reject();
            }
            return throwError(() => new Error());
          })
        )
        .subscribe((res) => {
          this._username = name;
          this._role = res.role;
          this._loggedIn = true;
          sessionStorage.setItem('username', this._username);
          sessionStorage.setItem('role', this._role);
          sessionStorage.setItem('loggedIn', this._loggedIn ? 'true' : 'false');
          resolve(true);
        });
    });
  }

  public logout() {
    this.http
      .get(`${this.url}/logout`, {
        withCredentials: true,
        headers: new HttpHeaders({
          'X-Requested-With': 'XMLHttpRequest',
        }),
      })
      .subscribe((res) => {
        this._username = '';
        this._role = '';
        this._loggedIn = false;
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('loggedIn');
      });
  }
}
