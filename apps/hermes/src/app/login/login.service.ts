import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../shared/api-urls';
import { LoginRequest, LoginResponse } from '@hermes/interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_URLS.login, {
      username,
      password,
    } as LoginRequest);
  }
}
