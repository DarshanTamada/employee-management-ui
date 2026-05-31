import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getUserName } from '../../utils/auth.utils';
import { AuthService } from '../../services/auth.service';
import { AppStateService } from '../../state/app-state.service';
import { Logger } from '../../core/logger';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private appState: AppStateService, private logger: Logger)
  {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {

    if (this.loginForm.invalid)
    {
      this.errorMessage = 'Please fill in all required fields correctly';

      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return;
    }

    this.authService.login(this.loginForm.value)
      .subscribe({
        next: (response) => {

          this.authService.saveToken(response.token);

          const userName = getUserName(response.token);

          this.appState.userName.set(userName);

          this.appState.setLoginState(true);

          this.router.navigate(['/dashboard']);

          this.logger.info(`User ${userName} logged in successfully`);
        },
        error: () => {
          this.errorMessage = 'Invalid email or password';
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000);
          this.logger.warn('Failed login attempt');
        }
      });
  }
}
