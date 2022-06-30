import { Routes } from '@angular/router';
import { EmployeeGuard } from '../shared/guards/employee.guard';
import { ManagerAtleastGuard } from '../shared/guards/manager-atleast.guard';
import { LeaveListComponent } from './leave-list/leave-list.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'request',
  },
  {
    path: 'request',
    canActivate: [EmployeeGuard],
    component: LeaveRequestComponent,
  },
  {
    path: 'management',
    canActivate: [ManagerAtleastGuard],
    component: LeaveListComponent,
  },
];

export { routes };
