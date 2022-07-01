import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EmployeeDeleteResponse,
  EmployeeListResponse,
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

  public getList(): Observable<EmployeeItem[]> {
    return this.http.get<EmployeeListResponse>(API_URLS.employee).pipe(
      map((users) =>
        users.map((user) => {
          const newUser: EmployeeItem = {
            ...user,
            leave: undefined,
          };
          if (user.leave) {
            newUser.leave = {
              from: new Date(user.leave.from),
              to: new Date(user.leave.to),
            };
          }
          return newUser;
        })
      )
    );
  }

  public change(
    id: string,
    employee: EmployeePutRequest
  ): Observable<EmployeeItem> {
    return this.http
      .put<EmployeePutResponse>(`${API_URLS.employee}/${id}`, employee)
      .pipe(
        map((emp) => {
          const newEmp: EmployeeItem = {
            ...emp,
            leave: undefined,
          };
          if (emp.leave) {
            newEmp.leave = {
              from: new Date(emp.leave.from),
              to: new Date(emp.leave.to),
            };
          }
          return newEmp;
        })
      );
  }

  public delete(id: string): Observable<EmployeeDeleteResponse> {
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
