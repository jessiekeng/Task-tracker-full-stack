import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router'; // Added Router import

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5001/api/auth';

  constructor(private http: HttpClient, private router: Router) { } // Injected Router

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token'); // Removes the security badge
    this.router.navigate(['/login']); // Sends user back to login page
  }
}