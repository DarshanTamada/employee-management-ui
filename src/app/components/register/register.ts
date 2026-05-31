import { Component , ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  registerForm: FormGroup;

  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router , private cdr: ChangeDetectorRef)
  {
    this.registerForm = this.fb.group({name: ['', Validators.required], email: ['', [Validators.required, Validators.email]], password: ['', Validators.required],role: ['User', Validators.required]});
  }

  onRegister(): void
  {

    if (this.registerForm.invalid)
    {
      this.errorMessage = 'Please fill in all required fields correctly';

      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return;
    }

    const formData = this.registerForm.value;

    this.authService.register(formData)
      .subscribe({
        next: (response: string) => {

          console.log('Registration success:', response);

          this.successMessage = 'Registration successful! Redirecting to login...';

          this.errorMessage = '';

          this.cdr.detectChanges();

          this.registerForm.reset();

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },

        error: (error) => {
          console.error('Registration error:', error);

          if (error.status === 400)
          {
            this.errorMessage = error.error;
          }
          else
          {
            this.errorMessage = 'Registration failed';
          }
        }
      });
  }
}
