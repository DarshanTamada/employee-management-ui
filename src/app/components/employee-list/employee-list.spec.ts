import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeList } from './employee-list';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('EmployeeList', () => {
  let component: EmployeeList;
  let fixture: ComponentFixture<EmployeeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [EmployeeList], providers: [provideHttpClient(), provideRouter([])]}).compileComponents();

    fixture = TestBed.createComponent(EmployeeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create employee list component', () => {
    expect(component).toBeTruthy();
  });
});
