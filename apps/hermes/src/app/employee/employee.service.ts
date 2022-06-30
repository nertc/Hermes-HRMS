import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EmployeeDeleteResponse,
  EmployeePostRequest,
  EmployeePostResponse,
  EmployeePutRequest,
  EmployeePutResponse,
  UserStatus,
} from '@hermes/interfaces';
import { map, Observable } from 'rxjs';
import { API_URLS } from '../shared/api-urls';
import { EmployeeItem } from './interfaces/employee-item.interface';

@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient) {}

  public change(
    id: number,
    employee: EmployeePutRequest
  ): Observable<EmployeeItem> {
    return this.http
      .put<EmployeePutResponse>(`${API_URLS.employee}/${id}`, employee)
      .pipe(
        map((emp) => ({
          ...emp,
          leave: {
            from: new Date(emp.leave.from),
            to: new Date(emp.leave.to),
          },
        }))
      );
  }

  public delete(id: number): Observable<EmployeeDeleteResponse> {
    return this.http.delete<EmployeeDeleteResponse>(
      `${API_URLS.employee}/${id}`
    );
  }

  public create(
    employee: EmployeePostRequest
  ): Observable<EmployeePostResponse> {
    return this.http.post<EmployeePostResponse>(API_URLS.employee, employee);
  }

  public canManipulate(manipulated: UserStatus, manipulator: UserStatus) {
    return manipulator > manipulated || manipulator === UserStatus.ADMIN;
  }
}
