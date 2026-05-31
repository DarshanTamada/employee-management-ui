import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { getDecodedToken, getUserRole, getUserName, getUserEmail } from '../../utils/auth.utils';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})

export class Profile implements OnInit {

  name = '';

  email = '';

  role = '';

  tokenStatus = 'No Token';

  constructor(private authService: AuthService) { }

  ngOnInit(): void
  {
    this.loadProfile();
  }

  loadProfile(): void
  {
    const token = this.authService.getToken();

    if (token)
    {
      this.tokenStatus = 'Valid Token Found';

      console.log('Decoded JWT:', getDecodedToken(token));

      this.name = getUserName(token) || 'No Name';

      this.email = getUserEmail(token) || 'No Email';

      this.role = getUserRole(token) || 'No Role';
    }
    else
    {
      this.tokenStatus = 'No Token Found';
    }

  }

}
