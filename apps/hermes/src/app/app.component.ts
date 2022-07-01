import { Component } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { UserService } from './user/user.service';

@Component({
  selector: 'hermes-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isMenuOpened = false;
  public isLoggedIn$: Observable<boolean>;
  public isLoggedInDelayed$: Observable<boolean>;

  constructor(private userService: UserService) {
    this.isLoggedIn$ = userService.onLoginChange$;
    this.isLoggedInDelayed$ = this.isLoggedIn$.pipe(delay(100));
  }

  public setMenuOpen(isOpened: boolean): void {
    this.isMenuOpened = isOpened;
  }
}
