import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { AuthService } from '../../services/auth.service';
import { AppStateService } from '../../state/app-state.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfirmDialog],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(private authService: AuthService, private router: Router, public appState: AppStateService) { }

  showLogoutDialog = false;

  openLogoutDialog() {
    this.showLogoutDialog = true;
  }

  closeLogoutDialog() {
    this.showLogoutDialog = false;
  }

  confirmLogout()
  {
    this.authService.logout();

    this.appState.clearState();

    this.router.navigate(['/login']);

    this.closeLogoutDialog();
  }
}
