import { Injectable } from '@angular/core';
import { LoginResponse, UserStatus } from '@hermes/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isLoggedIn = false;

  private $onLoginChange = new BehaviorSubject<boolean>(this.isLoggedIn);
  public onLoginChange$ = this.$onLoginChange.asObservable();

  public id = '';
  public firstName = '';
  public lastName = '';
  public status = UserStatus.EMPLOYEE;

  public getFullName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  public setUser(user: LoginResponse): void {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.status = user.status;
    this.isLoggedIn = true;
    this.$onLoginChange.next(this.isLoggedIn);
  }

  public logout(): void {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.status = UserStatus.EMPLOYEE;
    this.isLoggedIn = false;
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

  public isAtLeast(status: UserStatus): boolean {
    return this.status >= status;
  }
}
