import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Logger } from '../core/logger';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard {

  constructor(private authService: AuthService, private router: Router, private logger: Logger) { }

  logout(): void {

    this.authService.logout();
    this.logger.info('User logged out successfully');
    this.router.navigate(['/login']);

  }

}
