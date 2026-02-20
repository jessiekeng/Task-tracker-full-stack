import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth'; // Fixed: matches auth.ts
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: (res: any) => {
        console.log('Login successful!', res);
        this.router.navigate(['/tasks']);
      },
      error: (err: any) => {
        this.errorMessage = 'Invalid username or password';
        console.error(err);
      }
    });
  }
}