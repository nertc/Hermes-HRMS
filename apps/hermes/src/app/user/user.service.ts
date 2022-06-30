import { Injectable } from '@angular/core';
import { LoginResponse, UserStatus } from '@hermes/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isLoggedIn = true;

  private $onLoginChange = new BehaviorSubject<boolean>(this.isLoggedIn);
  public onLoginChange$ = this.$onLoginChange.asObservable();

  public firstName = 'David';
  public lastName = 'Tsiklauri';
  public status: UserStatus = UserStatus.MANAGER;

  public getFullName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  public setUser(user: LoginResponse) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.status = user.status;
    this.isLoggedIn = true;
    this.$onLoginChange.next(this.isLoggedIn);
  }

  public isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  public isManager(): boolean {
    return this.status === UserStatus.MANAGER;
  }

  public isAdmin(): boolean {
    return this.status === UserStatus.ADMIN;
  }

  public isEmployee(): boolean {
    return this.status === UserStatus.EMPLOYEE;
  }
}
