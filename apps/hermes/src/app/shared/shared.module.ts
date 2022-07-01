import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LogoComponent } from './logo/logo.component';
import { BackgroundComponent } from './background/background.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { GetPropertyPipe } from './pipes/get-property.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { InlineRangeCalendarComponent } from './inline-range-calendar/inline-range-calendar.component';
import { OnlyDigitsDirective } from './directives/only-digits.directive';

const exports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatButtonModule,
  LogoComponent,
  BackgroundComponent,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  GetPropertyPipe,
  StatusPipe,
  MatSelectModule,
  MatIconModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  RouterModule,
  MatCardModule,
  InlineRangeCalendarComponent,
  OnlyDigitsDirective,
];

@NgModule({
  declarations: [
    LogoComponent,
    BackgroundComponent,
    GetPropertyPipe,
    StatusPipe,
    InlineRangeCalendarComponent,
    OnlyDigitsDirective,
  ],
  imports: [CommonModule, MatDatepickerModule],
  exports: [...exports],
})
export class SharedModule {}
