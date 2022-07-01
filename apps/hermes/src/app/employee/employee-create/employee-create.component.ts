import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as e from 'express';
import { tap } from 'rxjs';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'hermes-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCreateComponent {
  public employeeForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(\+995)?\d{3}(-?\d{2}){3}$/g),
        ],
      ],
      salary: ['', [Validators.required]],
    });
  }

  public create() {
    this.employeeService
      .create(this.employeeForm.value)
      .pipe(tap(() => this.router.navigate(['/employee'])))
      .subscribe();
  }
}
