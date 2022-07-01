import { Component, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from '../user/user.service';

@Component({
  selector: 'hermes-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Output() openChanged = new EventEmitter<boolean>();

  isEmployee: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
      tap((isOpened) => isOpened || this.openChanged.emit(isOpened))
    );
  public toggle(matSidenav: MatSidenav) {
    matSidenav.toggle();
    this.openChanged.emit(matSidenav.opened);
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService
  ) {
    this.isEmployee = userService.isEmployee();
  }
}
