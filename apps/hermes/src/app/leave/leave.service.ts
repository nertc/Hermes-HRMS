import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LeaveListResponse,
  LeavePostRequest,
  LeavePostResponse,
  LeavePutRequest,
  LeavePutResponse,
} from '@hermes/interfaces';
import { map, Observable } from 'rxjs';
import { API_URLS } from '../shared/api-urls';
import { LeaveListItem } from './interfaces/leave-list-item.interface';

@Injectable()
export class LeaveService {
  constructor(private http: HttpClient) {}

  public getList(): Observable<LeaveListItem[]> {
    return this.http.get<LeaveListResponse>(API_URLS.leave).pipe(
      map((leaves) =>
        leaves.map((leave) => ({
          ...leave,
          leave: {
            from: new Date(leave.leave.from),
            to: new Date(leave.leave.to),
          },
        }))
      )
    );
  }

  public request(date: LeavePostRequest): Observable<LeavePostResponse> {
    return this.http.post(`${API_URLS.leave}/request`, date);
  }

  public accept(id: string): Observable<LeavePutResponse> {
    return this.http.put<LeavePutResponse>(`${API_URLS.leave}/${id}`, {
      accepted: true,
    } as LeavePutRequest);
  }

  public reject(id: string): Observable<LeavePutResponse> {
    return this.http.put<LeavePutResponse>(`${API_URLS.leave}/${id}`, {
      rejected: true,
    } as LeavePutRequest);
  }
}
