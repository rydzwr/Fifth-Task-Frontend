import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonResponse } from '../model/JsonResponse';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(
    private http: HttpClient,
    @Inject('SERVER_URL') private url: String
  ) {}

  public login(name: string, password: string): Observable<JsonResponse> {
    return this.http.get<JsonResponse>(`${this.url}/api/v1/login`, {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(`${name}:${password}`)
      })
    });
  }
}
