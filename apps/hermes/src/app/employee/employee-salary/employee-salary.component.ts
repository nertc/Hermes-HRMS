import { Component } from '@angular/core';
import { EmployeeColumn } from '../interfaces/employee-column.enum';

@Component({
  selector: 'hermes-employee-salary',
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.scss'],
})
export class EmployeeSalaryComponent {
  public columns: EmployeeColumn[] = [
    EmployeeColumn.ID,
    EmployeeColumn.FULL_NAME,
    EmployeeColumn.ROLE,
    EmployeeColumn.LEAVE,
    EmployeeColumn.WORKING,
    EmployeeColumn.TOTAL,
    EmployeeColumn.SALARY,
    EmployeeColumn.ATTANDENCE,
  ];
}
