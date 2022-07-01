import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private headerService: HeaderService,
    private router: Router
  ) {
    this.fullName = userService.getFullName();
  }

  public logout(): void {
    this.headerService
      .logout()
      .pipe(
        tap(() => this.userService.logout()),
        tap(() => this.router.navigate(['/login']))
      )
      .subscribe();
  }
}
