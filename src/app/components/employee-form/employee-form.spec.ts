import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeForm } from './employee-form';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('EmployeeForm', () => {
  let component: EmployeeForm;
  let fixture: ComponentFixture<EmployeeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [EmployeeForm], providers: [provideHttpClient(), provideRouter([])]}).compileComponents();

    fixture = TestBed.createComponent(EmployeeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create employee form component', () => {
    expect(component).toBeTruthy();
  });
});
