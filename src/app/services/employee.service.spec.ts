import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';
import { provideHttpClient } from '@angular/common/http';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });

    service = TestBed.inject(EmployeeService);
  });

  it('should create employee service', () => {
    expect(service).toBeTruthy();
  });
});
