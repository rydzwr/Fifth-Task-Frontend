import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, interval, throwError, timer } from 'rxjs';
import { UserAuth } from '../model/UserAuth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService implements CanActivate {
  private _loggedIn;
  private _username;
  private _accessToken;
  private _role;

  private _refreshInterval = interval(4000);

  public get loggedIn() {
    return this._loggedIn;
  }

  public get username() {
    return this._username;
  }

  public get role() {
    return this._role;
  }

  public get authHeader(): HttpHeaders {
    return new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this._accessToken
    });
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('SERVER_URL') private url: String
  ) {
    this._loggedIn = sessionStorage.getItem("loggedIn") ? true : false;
    this._username = sessionStorage.getItem("username") ?? "";
    this._role = sessionStorage.getItem("role") ?? "";
    this._accessToken = sessionStorage.getItem("access_token") ?? "";
    this._refreshInterval.subscribe(val => this.refreshToken());
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
      let body = new URLSearchParams();
      body.set('username', name);
      body.set('password', password);

      this.http
        .post<UserAuth>(`${this.url}/api/login`, body.toString(), {
          withCredentials: true,
          headers: new HttpHeaders({
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded'
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
          this._accessToken = res.access_token;
          sessionStorage.setItem('username', this._username);
          sessionStorage.setItem('role', this._role);
          sessionStorage.setItem('loggedIn', this._loggedIn ? 'true' : 'false');
          sessionStorage.setItem('access_token', this._accessToken);
          resolve(true);
        });
    });
  }

  public logout() {
    this.http
      .get(`${this.url}/api/logout`, {
        withCredentials: true,
        headers: this.authHeader,
      })
      .subscribe((res) => {
        this._username = '';
        this._role = '';
        this._loggedIn = false;
        this._accessToken = "";
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('access_token');
      });
  }

  public refreshToken() {
    this.http
      .get<UserAuth>(`${this.url}/api/token/refresh`, {
        withCredentials: true,
        headers: this.authHeader,
      })
      .subscribe((res) => {
        this._accessToken = res.access_token;
        sessionStorage.setItem('access_token', this._accessToken);
      });
  }
}
