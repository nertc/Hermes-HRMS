import { Component } from '@angular/core';
import { EmployeeColumn } from '../interfaces/employee-column.enum';

@Component({
  selector: 'hermes-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss'],
})
export class EmployeeManagementComponent {
  public columns: EmployeeColumn[] = [
    EmployeeColumn.ID,
    EmployeeColumn.FULL_NAME,
    EmployeeColumn.ROLE,
    EmployeeColumn.PHONE,
    EmployeeColumn.DELETE,
  ];
}
