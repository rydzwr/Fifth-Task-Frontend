import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../model/UserData';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private _authService: UserAuthService,
    private http: HttpClient,
    @Inject('SERVER_URL') private url: String
  ) {}

  public getUserData(): Observable<UserData> {
    return this.http.get<UserData>(`${this.url}/api/v1/data/user`, {
      withCredentials: true,
      headers: new HttpHeaders({
        "X-Requested-With": "XMLHttpRequest"
      })
    });
  }

  public getAdminData(): Observable<UserData> {
    return this.http.get<UserData>(`${this.url}/api/v1/data/admin`, {
      withCredentials: true,
      headers: new HttpHeaders({
        "X-Requested-With": "XMLHttpRequest"
      })
    });
  }
}
