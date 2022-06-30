import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { LeaveService } from '../leave.service';

@Component({
  selector: 'hermes-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaveRequestComponent {
  public date: DateRange<Date> | undefined;

  constructor(private leaveService: LeaveService) {}

  public dateChanged(date: DateRange<Date>): void {
    this.date = date;
  }

  public request(): void {
    if (!this.date || !this.date.start || !this.date.end) {
      return;
    }
    const date = {
      from: this.date.start.getTime(),
      to: this.date.end.getTime(),
    };
    this.leaveService.request(date).subscribe();
  }
}
