import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { LeaveListItem } from '../interfaces/leave-list-item.interface';
import { EventEmitter } from '@angular/core';

// TODO: replace this with real data from your application
const EXAMPLE_DATA: LeaveListItem[] = [
  {
    id: 1,
    fullname: 'Hydrogen',
    leave: { from: new Date(2022, 5, 15), to: new Date(2022, 5, 25) },
    userId: 5,
  },
  {
    id: 2,
    fullname: 'Helium',
    leave: { from: new Date(2022, 5, 15), to: new Date(2022, 5, 25) },
    userId: 5,
  },
  {
    id: 3,
    fullname: 'Lithium',
    leave: { from: new Date(2022, 5, 15), to: new Date(2022, 5, 25) },
    userId: 5,
  },
  {
    id: 4,
    fullname: 'Beryllium',
    leave: { from: new Date(2022, 5, 15), to: new Date(2022, 5, 25) },
    userId: 5,
  },
  {
    id: 5,
    fullname: 'Boron',
    leave: { from: new Date(2022, 5, 15), to: new Date(2022, 5, 25) },
    userId: 5,
  },
  {
    id: 6,
    fullname: 'Carbon',
    leave: { from: new Date(2022, 5, 15), to: new Date(2022, 5, 25) },
    userId: 5,
  },
  {
    id: 7,
    fullname: 'Nitrogen',
    leave: { from: new Date(2022, 5, 15), to: new Date(2022, 5, 25) },
    userId: 5,
  },
  {
    id: 8,
    fullname: 'Oxygen',
    leave: { from: new Date(2022, 5, 15), to: new Date(2022, 5, 25) },
    userId: 5,
  },
  {
    id: 9,
    fullname: 'Fluorine',
    leave: { from: new Date(2022, 5, 15), to: new Date(2022, 5, 25) },
    userId: 5,
  },
  {
    id: 10,
    fullname: 'Neon',
    leave: { from: new Date(2022, 5, 15), to: new Date(2022, 5, 25) },
    userId: 5,
  },
  {
    id: 11,
    fullname: 'Sodium',
    leave: { from: new Date(2022, 5, 15), to: new Date(2022, 5, 25) },
    userId: 5,
  },
  {
    id: 12,
    fullname: 'Magnesium',
    leave: { from: new Date(2022, 5, 15), to: new Date(2022, 5, 25) },
    userId: 5,
  },
  {
    id: 13,
    fullname: 'Aluminum',
    leave: { from: new Date(2022, 5, 15), to: new Date(2022, 5, 25) },
    userId: 5,
  },
  {
    id: 14,
    fullname: 'Silicon',
    leave: { from: new Date(2022, 5, 15), to: new Date(2022, 5, 25) },
    userId: 5,
  },
  {
    id: 15,
    fullname: 'Phosphorus',
    leave: { from: new Date(2022, 5, 15), to: new Date(2022, 5, 25) },
    userId: 5,
  },
  {
    id: 16,
    fullname: 'Sulfur',
    leave: { from: new Date(2022, 5, 15), to: new Date(2022, 5, 25) },
    userId: 5,
  },
  {
    id: 17,
    fullname: 'Chlorine',
    leave: { from: new Date(2022, 5, 15), to: new Date(2022, 5, 25) },
    userId: 5,
  },
  {
    id: 18,
    fullname: 'Argon',
    leave: { from: new Date(2022, 5, 15), to: new Date(2022, 5, 25) },
    userId: 5,
  },
  {
    id: 19,
    fullname: 'Potassium',
    leave: { from: new Date(2022, 5, 15), to: new Date(2022, 5, 25) },
    userId: 5,
  },
  {
    id: 20,
    fullname: 'Calcium',
    leave: { from: new Date(2022, 5, 15), to: new Date(2022, 5, 25) },
    userId: 5,
  },
];

/**
 * Data source for the LeaveList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class LeaveListDataSource extends DataSource<LeaveListItem> {
  data: LeaveListItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  dataChanged = new EventEmitter<boolean>();

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<LeaveListItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange,
        this.dataChanged
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
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
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: LeaveListItem[]): LeaveListItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: LeaveListItem[]): LeaveListItem[] {
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

  public deleteLeave(id: number): void {
    this.data = this.data.filter((lv) => lv.id !== id);
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
