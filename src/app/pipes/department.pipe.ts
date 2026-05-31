import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'department',
  standalone: true
})

export class DepartmentPipe implements PipeTransform {

  transform(value: string): string {

    switch (value) {
      case 'IT':
        return 'Information Technology';
      case 'HR':
        return 'Human Resources';
      case 'Fin':
        return 'Finance';
      default:
        return value;
    }
  }
}
