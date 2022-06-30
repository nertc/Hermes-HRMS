import { Pipe, PipeTransform } from '@angular/core';
import { UserStatus } from '@hermes/interfaces';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(value: UserStatus, ...args: unknown[]): unknown {
    switch (value) {
      case UserStatus.ADMIN:
        return 'Admin';
      case UserStatus.MANAGER:
        return 'Manager';
      case UserStatus.EMPLOYEE:
        return 'Employee';
    }
  }
}
