import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LogoComponent } from './logo/logo.component';
import { BackgroundComponent } from './background/background.component';

@NgModule({
  declarations: [LogoComponent, BackgroundComponent],
  imports: [CommonModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    LogoComponent,
    BackgroundComponent,
  ],
})
export class SharedModule {}
