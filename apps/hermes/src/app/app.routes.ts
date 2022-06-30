import { Routes } from '@angular/router';
import { LoginGuard } from './login/login.guard';
import { AuthGuard } from './user/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'employee',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

export { routes };
