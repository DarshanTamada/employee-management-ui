import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-employee-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-dialog.html',
  styleUrl: './employee-dialog.css',
})
export class EmployeeDialog {

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) { }

  isSaving = false;

  employeeForm!: FormGroup;

  @Input() employee!: Employee;

  @Output() close = new EventEmitter<void>();

  @Output() saved = new EventEmitter<void>();

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: [this.employee?.name, Validators.required],
      department: [this.employee?.department, Validators.required],
      salary: [this.employee?.salary, Validators.required],
      email: [this.employee?.email, [Validators.required, Validators.email]],
      status: [this.employee?.status, Validators.required]
    });

    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
  }

  updateEmployee() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const updatedEmployee = {
      ...this.employee,

      ...this.employeeForm.value
    };

    this.isSaving = true;

    setTimeout(() => {
      this.employeeService.updateEmployee(Number(this.employee.id), updatedEmployee)
        .subscribe({
          next: () => {

            console.log('Employee updated successfully');

            this.saved.emit();
          },

          error: (error) => {
            console.error(error);

            console.log('Failed to update employee');
          }
        });

      this.isSaving = false;
    }, 2000);
  }

  closeDialog() {
    this.close.emit();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeDialog();
  }
}
