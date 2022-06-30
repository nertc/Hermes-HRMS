import { NgModule } from '@angular/core';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './leave.routes';
import { LeaveService } from './leave.service';
import { LeaveListComponent } from './leave-list/leave-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [LeaveRequestComponent, LeaveListComponent],
  imports: [SharedModule, RouterModule.forChild(routes), MatTableModule, MatPaginatorModule, MatSortModule],
  providers: [LeaveService],
})
export class LeaveModule {}
