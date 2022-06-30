import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LeavePostRequest,
  LeavePostResponse,
  LeavePutRequest,
  LeavePutResponse,
} from '@hermes/interfaces';
import { Observable } from 'rxjs';
import { API_URLS } from '../shared/api-urls';

@Injectable()
export class LeaveService {
  constructor(private http: HttpClient) {}

  public request(date: LeavePostRequest): Observable<LeavePostResponse> {
    return this.http.post(`${API_URLS.leave}/request`, date);
  }

  public accept(id: number): Observable<LeavePutResponse> {
    return this.http.put<LeavePutResponse>(`${API_URLS.leave}/${id}`, {
      accepted: true,
    } as LeavePutRequest);
  }

  public reject(id: number): Observable<LeavePutResponse> {
    return this.http.put<LeavePutResponse>(`${API_URLS.leave}/${id}`, {
      rejected: true,
    } as LeavePutRequest);
  }
}
