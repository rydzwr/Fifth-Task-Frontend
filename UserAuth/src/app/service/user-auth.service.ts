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
    return this.http.get<string>(`${this.url}/api/v1/home`, {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(`${name}:${password}`)
      })
    });
  }
}
