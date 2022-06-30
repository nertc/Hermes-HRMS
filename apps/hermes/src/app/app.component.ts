import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user/user.service';

@Component({
  selector: 'hermes-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public isMenuOpened = false;
  public isLoggedIn$: Observable<boolean>;

  constructor(private userService: UserService) {
    this.isLoggedIn$ = userService.onLoginChange$;
  }

  public setMenuOpen(isOpened: boolean): void {
    this.isMenuOpened = isOpened;
  }
}
