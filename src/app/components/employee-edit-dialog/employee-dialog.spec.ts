import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { EmployeeDialog } from './employee-dialog';

describe('EmployeeDialog', () => {
  let component: EmployeeDialog;
  let fixture: ComponentFixture<EmployeeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDialog],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDialog);
    component = fixture.componentInstance;
    component.employee = {id: 1, name: 'darshan', department: 'IT', salary: 50000, email: 'darshan@gmail.com', status: 'Active'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
