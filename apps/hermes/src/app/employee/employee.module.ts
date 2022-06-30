import { NgModule } from '@angular/core';
import { EmployeeService } from './employee.service';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { RouterModule } from '@angular/router';
import { routes } from './employee.routes';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeSalaryComponent,
    EmployeeManagementComponent,
    EmployeeCreateComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [EmployeeService],
})
export class EmployeeModule {}
