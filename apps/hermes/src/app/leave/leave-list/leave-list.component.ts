import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { tap } from 'rxjs';
import { LeaveListDataSource } from '../classes/leave-list-datasource';
import { LeaveListItem } from '../interfaces/leave-list-item.interface';
import { LeaveService } from '../leave.service';

@Component({
  selector: 'hermes-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.scss'],
})
export class LeaveListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<LeaveListItem>;
  dataSource: LeaveListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'leave', 'accept', 'reject'];

  constructor(private leaveService: LeaveService) {
    this.dataSource = new LeaveListDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  public accept(id: number): void {
    this.leaveService
      .accept(id)
      .pipe(tap(() => this.dataSource.deleteLeave(id)))
      .subscribe();
  }

  public reject(id: number): void {
    this.leaveService
      .reject(id)
      .pipe(tap(() => this.dataSource.deleteLeave(id)))
      .subscribe();
  }
}
