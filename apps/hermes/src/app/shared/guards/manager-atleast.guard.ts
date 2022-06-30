import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserStatus } from '@hermes/interfaces';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../employee/employee.service';
import { UserService } from '../../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerAtleastGuard implements CanActivate {
  constructor(private userService: UserService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userService.isAtLeast(UserStatus.MANAGER);
  }
}
