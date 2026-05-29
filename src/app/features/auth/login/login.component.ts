import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  loading = signal(false);
  errorMsg = signal('');

  submit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.errorMsg.set('');

    this.authService.login(this.form.value as any).subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: err => {
        this.errorMsg.set(err.error?.message ?? 'Login failed. Check your credentials.');
        this.loading.set(false);
      }
    });
  }
}
