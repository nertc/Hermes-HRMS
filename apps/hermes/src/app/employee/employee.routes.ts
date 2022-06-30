import { Routes } from '@angular/router';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'management',
  },
  {
    path: 'salary',
    component: EmployeeSalaryComponent,
  },
  {
    path: 'management',
    component: EmployeeManagementComponent,
  },
  {
    path: 'create',
    component: EmployeeCreateComponent,
  },
];

export { routes };
