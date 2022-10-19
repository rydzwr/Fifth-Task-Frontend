import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthorizationJsonResponse } from '../model/UserAuthorizationJsonResponse';
import { UserAuthorizationJsonRequest } from '../model/UserAuthorizationJsonRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(
    private http: HttpClient,
    @Inject('SERVER_URL') private url: String
  ) {}

  public login(name: string, password: string): Observable<string> {
    const body: UserAuthorizationJsonRequest = {
      name: name,
      password: password,
    };

    return this.http.post<string>(`${this.url}/api/v1/login`, body);
  }

  public getUserDetails(
    sessionCode: string
  ): Observable<UserAuthorizationJsonResponse> {
    return this.http.get<UserAuthorizationJsonResponse>(
      `${this.url}/api/v1/userDetails`,
      {
        headers: new HttpHeaders({
          UserSessionCode: sessionCode.toString(),
        }),
      }
    );
  }
}
