import { Injectable } from '@angular/core';
import { LoginResponse, UserStatus } from '@hermes/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public firstName = '';
  public lastName = '';
  public status: UserStatus | undefined;

  private isLoggedIn = false;

  public getFullName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  public setUser(user: LoginResponse) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.status = user.status;
    this.isLoggedIn = true;
  }

  public isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
