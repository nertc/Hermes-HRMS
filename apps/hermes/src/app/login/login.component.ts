import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessage } from '@hermes/interfaces';
import { catchError, mapTo, merge, Observable, of, takeWhile } from 'rxjs';
import { tap } from 'rxjs';
import { UserService } from '../user/user.service';
import { LoginService } from './login.service';

@Component({
  selector: 'hermes-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public loginForm: FormGroup;
  public usernameControl: FormControl;
  public passwordControl: FormControl;

  public message$: Observable<string>;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
  ) {
    this.usernameControl = new FormControl('', {
      validators: [Validators.required],
    });
    this.passwordControl = new FormControl('', {
      validators: [Validators.required],
    });
    this.loginForm = new FormGroup({
      username: this.usernameControl,
      password: this.passwordControl,
    });

    this.message$ = new Observable();
  }

  public login(): void {
    const login$ = this.loginService
      .login(this.usernameControl.value, this.passwordControl.value)
      .pipe(
        tap((user) => this.userService.setUser(user)),
        tap(() => this.router.navigate(['employee']))
      );

    this.message$ = merge(
      this.loginForm.valueChanges.pipe(mapTo('')),
      login$.pipe(
        mapTo(''),
        catchError((error: ErrorMessage) => of(error.message))
      )
    ).pipe(takeWhile((v) => !!v, true));
  }
}
