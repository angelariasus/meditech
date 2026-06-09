import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, tap } from 'rxjs';

export interface AuthResponse {
  status: string;
  data: {
    token: string;
    refreshToken: string;
    user: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = inject(ApiService);
  
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.checkToken();
  }

  login(credentials: any) {
    return this.api.post<AuthResponse>('/auth/login', credentials).pipe(
      tap((res: AuthResponse) => {
        if (res.status === 'success' && res.data) {
          localStorage.setItem('meditech_token', res.data.token);
          localStorage.setItem('meditech_refresh', res.data.refreshToken);
          this.currentUserSubject.next(res.data.user);
        }
      })
    );
  }

  logout() {
    return this.api.post('/auth/logout', {}).pipe(
      tap(() => {
        localStorage.removeItem('meditech_token');
        localStorage.removeItem('meditech_refresh');
        this.currentUserSubject.next(null);
      })
    );
  }

  checkToken() {
    const token = localStorage.getItem('meditech_token');
    if (token) {
      // In a real app, you would decode the JWT to check expiration and get user info
      this.currentUserSubject.next({ authenticated: true });
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('meditech_token');
  }
}
