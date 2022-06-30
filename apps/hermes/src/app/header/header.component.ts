import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { UserService } from '../user/user.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'hermes-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public fullName: string;

  constructor(
    private userService: UserService,
    private headerService: HeaderService
  ) {
    this.fullName = userService.getFullName();
  }

  public logout(): void {
    this.headerService.logout().pipe(tap(this.userService.logout)).subscribe();
  }
}
