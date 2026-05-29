import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest, UserDto } from '../models/auth.model';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  login(req: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, req).pipe(
      tap(res => {
        this.tokenService.setToken(res.accessToken);
        this.tokenService.setUser(res.user);
      })
    );
  }

  register(req: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, req).pipe(
      tap(res => {
        this.tokenService.setToken(res.accessToken);
        this.tokenService.setUser(res.user);
      })
    );
  }

  logout(): void {
    this.tokenService.clear();
    this.router.navigate(['/auth/login']);
  }

  getCurrentUser(): UserDto | null {
    return this.tokenService.getUser();
  }

  isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }
}
