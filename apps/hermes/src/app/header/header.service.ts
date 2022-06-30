import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogoutResponse } from '@hermes/interfaces';
import { Observable } from 'rxjs';
import { API_URLS } from '../shared/api-urls';

@Injectable()
export class HeaderService {
  constructor(private http: HttpClient) {}

  public logout(): Observable<LogoutResponse> {
    return this.http.post(API_URLS.logout, {});
  }
}
