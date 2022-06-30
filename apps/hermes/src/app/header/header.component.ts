import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'hermes-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public fullName: string;

  constructor(private userService: UserService) {
    this.fullName = userService.getFullName();
  }
}
