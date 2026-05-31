import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm {

  employeeForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router)
  {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      department: ['IT', Validators.required],
      salary: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: ['Active', Validators.required]
    });
  }

  onSubmit(): void {

    if (this.employeeForm.invalid)
    {
      this.errorMessage = 'Please fill in all required fields correctly';

      setTimeout(() => { 
        this.errorMessage = '';
      }, 2000);
      return;
    }

    const employeeData = this.employeeForm.value;

    this.employeeService.addEmployee(employeeData)
        .subscribe({
          next: (response: string) => {

            console.log('Add employee success:', response);

            this.successMessage = 'Employee added successfully';

            this.employeeForm.reset();

            setTimeout(() => {
              this.router.navigate(['/employees']);
            }, 2000);
          },
          error: (error) => {
            console.error(error);
            this.errorMessage = 'Add employee failed';
          }
        });
    
  }
}
