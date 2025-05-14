import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private API = 'http://localhost:3000/api/auth';

    constructor(private http: HttpClient) { }

    login(credentials: any) {
        return this.http.post<{ token: string }>(`${this.API}/login`, credentials)
            .pipe(tap(res => localStorage.setItem('token', res.token)));
    }

    signup(user: any) {
        return this.http.post(`${this.API}/register`, user);
    }

    logout() {
        localStorage.removeItem('token');
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
}
