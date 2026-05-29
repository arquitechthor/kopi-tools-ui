import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private authService = inject(AuthService);
  user = this.authService.getCurrentUser();
}
