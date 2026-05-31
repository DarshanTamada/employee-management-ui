import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { PagedEmployeeResponse } from '../models/paged-employee-response.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class EmployeeService {

  private apiUrl = `${environment.apiBaseUrl}/employee`;

  constructor(private http: HttpClient) { }

  // Get all employees
  // getEmployees(): Observable<Employee[]>
  // {
  //   return this.http.get<Employee[]>(this.apiUrl);
  // }

  // Get employees with pagination
  getEmployees(page: number, pageSize: number): Observable<PagedEmployeeResponse>
  {
    return this.http.get<PagedEmployeeResponse>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }

  // Get employee by ID
  getEmployeeById(id: number): Observable<Employee>
  {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  //Add new employee
  addEmployee(employee: Employee): Observable<string>
  {
    return this.http.post(this.apiUrl, employee, { responseType: 'text' });
  }

  // Update employee
  updateEmployee(id: number, employee: Employee): Observable<string>
  {
    return this.http.put(`${this.apiUrl}/${id}`, employee, { responseType: 'text' });
  }

  // Delete employee
  deleteEmployee(id: number): Observable<string>
  {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

}
