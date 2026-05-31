import { Employee } from './employee.model';

export interface PagedEmployeeResponse {

  employees: Employee[];

  totalCount: number;

  currentPage: number;

  pageSize: number;
}
