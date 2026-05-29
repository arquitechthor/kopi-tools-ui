import { Injectable } from '@angular/core';
import { UserDto } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly TOKEN_KEY = 'kopi_token';
  private readonly USER_KEY = 'kopi_user';

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  setUser(user: UserDto): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): UserDto | null {
    const u = localStorage.getItem(this.USER_KEY);
    return u ? JSON.parse(u) : null;
  }

  removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  clear(): void {
    this.removeToken();
    this.removeUser();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
