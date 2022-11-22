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
    private http: HttpClient,
    private auth: UserAuthService,
    @Inject('SERVER_URL') private url: String
  ) {}

  public getUserData(): Observable<UserData> {
    return this.http.get<UserData>(`${this.url}/api/data/user`, {
      withCredentials: true,
      headers: this.auth.authHeader
    });
  }

  public getAdminData(): Observable<UserData> {
    return this.http.get<UserData>(`${this.url}/api/data/admin`, {
      withCredentials: true,
      headers: this.auth.authHeader
    });
  }
}
