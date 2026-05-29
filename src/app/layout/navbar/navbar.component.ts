import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserDto } from '../../core/models/auth.model';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private authService = inject(AuthService);

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get currentUser(): UserDto | null {
    return this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
  }
}
