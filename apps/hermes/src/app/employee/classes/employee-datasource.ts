import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, tap } from 'rxjs/operators';
import { Observable, of as observableOf, merge, of } from 'rxjs';
import { EmployeeItem } from '../interfaces/employee-item.interface';
import { EventEmitter } from '@angular/core';
import { EmployeeService } from '../employee.service';

/**
 * Data source for the Employee view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EmployeeDataSource extends DataSource<EmployeeItem> {
  data: EmployeeItem[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  dataChanged = new EventEmitter<boolean>();
  filter = '';

  constructor(
    private employeeService: EmployeeService,
    public search: Observable<string> = of()
  ) {
    super();
    employeeService
      .getList()
      .pipe(
        tap((employee) => (this.data = employee)),
        tap(() => this.dataChanged.emit(true))
      )
      .subscribe();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<EmployeeItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange,
        this.dataChanged,
        this.search.pipe(map((s) => (this.filter = s)))
      ).pipe(
        map(() => {
          return this.getPagedData(
            this.getSortedData(this.getFilteredData([...this.data]))
          );
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    return;
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: EmployeeItem[]): EmployeeItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getFilteredData(data: EmployeeItem[]): EmployeeItem[] {
    if (!this.filter) {
      return data;
    }

    return data.filter((datum) => datum.fullname.includes(this.filter));
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: EmployeeItem[]): EmployeeItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name':
          return compare(a.fullname, b.fullname, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }

  public changeEmployee(id: string, employee: EmployeeItem): void {
    const index = this.data.findIndex((emp) => emp.id === id);
    this.data[index] = employee;
    this.dataChanged.emit(true);
  }

  public getEmployee(id: string): EmployeeItem | undefined {
    return this.data.find((emp) => emp.id === id);
  }

  public deleteEmployee(id: string): void {
    this.data = this.data.filter((emp) => emp.id !== id);
    this.dataChanged.emit(true);
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
