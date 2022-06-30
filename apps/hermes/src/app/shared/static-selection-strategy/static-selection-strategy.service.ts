import { Injectable } from '@angular/core';
import {
  DateRange,
  MatDateRangeSelectionStrategy,
} from '@angular/material/datepicker';

@Injectable()
export class StaticSelectionStrategy<D>
  implements MatDateRangeSelectionStrategy<D>
{
  selectionFinished(
    date: D | null,
    currentRange: DateRange<D>,
    event: Event
  ): DateRange<D> {
    return currentRange;
  }
  createPreview(
    activeDate: D | null,
    currentRange: DateRange<D>,
    event: Event
  ): DateRange<D> {
    return currentRange;
  }
}
