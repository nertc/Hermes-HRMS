import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UserStatus } from '@hermes/interfaces';
import { catchError, filter, Observable, of, tap } from 'rxjs';
import { UserService } from '../../user/user.service';
import { EmployeeDataSource } from '../classes/employee-datasource';
import { EmployeeItem } from '../interfaces/employee-item.interface';
import { EmployeeService } from '../employee.service';
import { MatSelect } from '@angular/material/select';
import { RoleTitle } from '../interfaces/role-title.interface';
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { StaticSelectionStrategy } from '../../shared/static-selection-strategy/static-selection-strategy.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { EmployeeColumn } from '../interfaces/employee-column.enum';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'hermes-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: StaticSelectionStrategy,
    },
  ],
})
export class EmployeeListComponent implements AfterViewInit, OnInit {
  @Input() columns: EmployeeColumn[] = [];
  @Input() search = false;
  @Input() add = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EmployeeItem>;

  dataSource: EmployeeDataSource;

  allRoles: RoleTitle[] = [
    {
      role: UserStatus.EMPLOYEE,
      title: 'Employee',
    },
    {
      role: UserStatus.MANAGER,
      title: 'Manager',
    },
    {
      role: UserStatus.ADMIN,
      title: 'Admin',
    },
  ];
  roles: RoleTitle[];

  displayedColumns: EmployeeColumn[] = [];
  searchControl = new FormControl('');
  canadd: boolean;

  constructor(
    private userService: UserService,
    private employeeService: EmployeeService
  ) {
    this.dataSource = new EmployeeDataSource(
      this.searchControl.valueChanges.pipe(
        filter((v) => v !== null)
      ) as Observable<string>
    );
    this.roles = this.allRoles.filter(
      ({ role }) =>
        employeeService.canManipulate(role, this.userService.status) ||
        role === this.userService.status
    );
    this.canadd = userService.isAdmin() || userService.isManager();
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns.filter(
      (column) =>
        !(
          this.userService.status === UserStatus.EMPLOYEE &&
          [
            EmployeeColumn.ID,
            EmployeeColumn.SALARY,
            EmployeeColumn.DELETE,
          ].includes(column)
        )
    );
    this.searchControl.valueChanges.pipe(tap());
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  public changeRole(id: number, newRole: UserStatus, matSelect: MatSelect) {
    this.employeeService
      .change(id, { role: newRole })
      .pipe(
        catchError(() => of(this.dataSource.getEmployee(id))),
        filter(Boolean),
        tap((newEmployee) => this.dataSource.changeEmployee(id, newEmployee)),
        tap(({ role }) => matSelect.writeValue(role))
      )
      .subscribe();
  }

  public changeAttandence(
    id: number,
    newAttandence: boolean,
    matSlideToggle: MatSlideToggle
  ) {
    this.employeeService
      .change(id, { attandence: newAttandence })
      .pipe(
        catchError(() => of(this.dataSource.getEmployee(id))),
        filter(Boolean),
        tap((newEmployee) => this.dataSource.changeEmployee(id, newEmployee)),
        tap(({ attandence }) => matSlideToggle.writeValue(attandence))
      )
      .subscribe();
  }

  public remove(id: number): void {
    this.employeeService
      .delete(id)
      .pipe(tap(() => this.dataSource.deleteEmployee(id)))
      .subscribe();
  }

  public canManipulate(role: UserStatus): boolean {
    return this.employeeService.canManipulate(role, this.userService.status);
  }
}
