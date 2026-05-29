import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  loading = signal(false);
  errorMsg = signal('');

  submit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.errorMsg.set('');

    this.authService.register(this.form.value as any).subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: err => {
        this.errorMsg.set(err.error?.message ?? 'Registration failed.');
        this.loading.set(false);
      }
    });
  }
}
