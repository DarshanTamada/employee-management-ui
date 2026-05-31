import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DepartmentPipe } from '../../pipes/department.pipe';
import { EmployeeDialog } from '../employee-edit-dialog/employee-dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { HighlightDirective } from '../../directives/highlight.directive';
import { Logger } from '../../core/logger';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink, HighlightDirective, DepartmentPipe, EmployeeDialog, ConfirmDialog],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {

  constructor(private employeeService: EmployeeService, private changeDetectorRef: ChangeDetectorRef, private logger: Logger) { }

  currentPage = 1;

  pageSize = 5;

  totalCount = 0;

  totalPages = 0;

  pageNumbers: number[] = [];

  showDialog = false;

  showDeleteDialog = false;

  emloyeeToDelete: any = null;

  selectedEmployee: any = null;

  employees: Employee[] = [];

  errorMessage = '';

  isLoading = false;

  ngOnInit(): void
  {
    this.loadEmployees();
  }

  onEmployeeUpdated() {
    this.loadEmployees();
    this.closeDialog();
  }

  openDialog(employee: any)
  {
    this.selectedEmployee = employee;
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
    this.selectedEmployee = null;
  }

  openDeleteDialog(employee: any) {
    this.emloyeeToDelete = employee;
    this.showDeleteDialog = true;
  }

  closeDeleteDialog() {
    this.showDeleteDialog = false;
    this.emloyeeToDelete = null;
  }

  loadEmployees(): void
  {

    this.isLoading = true;

    this.employeeService.getEmployees(this.currentPage, this.pageSize)
      .subscribe({
        next: (response: any) => {

          setTimeout(() => {

            this.employees = response.employees;

            this.totalCount = response.totalCount;

            this.totalPages = Math.ceil(this.totalCount / this.pageSize);

            this.updatePageNumbers();

            console.log(response);

            this.isLoading = false;

            this.logger.info(`Loaded employees for page ${this.currentPage} with page size ${this.pageSize}`);

            this.changeDetectorRef.detectChanges();
          }, 1000);
        },
        error: (error) => {

          console.error(error);

          this.logger.error(`Failed to load employees: ${error.message}`);

          this.isLoading = false;
        }
      });
  }

  updatePageNumbers() {
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  nextPage() {
    if (this.currentPage < this.totalPages)
    {
      this.currentPage++;
      this.loadEmployees();
    }
  }

  previousPage() {
    if (this.currentPage > 1)
    {
      this.currentPage--;
      this.loadEmployees();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.loadEmployees();
  }

  onPageSizeChange(event: Event) {
    const value = +(event.target as HTMLSelectElement).value;
    this.pageSize = value;
    this.currentPage = 1;
    this.loadEmployees();
  }

  getStartRecord(): number {
    return ((this.currentPage - 1) * this.pageSize) + 1;
  }

  getEndRecord(): number {
    const end = this.currentPage * this.pageSize;
    return Math.min(end, this.totalCount);
  }

  confirmDelete() {

    if (!this.emloyeeToDelete) {
      return;
    }

    this.employeeService.deleteEmployee(this.emloyeeToDelete.id)
      .subscribe({
        next: () => {

          console.log('Delete success');

          this.loadEmployees();

          this.closeDeleteDialog();
        },
        error: (error) => {
          if (error.status === 403) {
            this.errorMessage = 'You do not have permission to delete this employee';
          }
          else {
            this.errorMessage = 'An API error occurred while deleting the employee';
            console.error(error);
          }
          this.closeDeleteDialog();
        }
      });
  }

}
