import { Component } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      alert('Kérjük, töltse ki az összes mezőt!');
      return;
    }

    const data = {
      Email: this.email,
      Password: this.password,
    };

    this.http.post('http://localhost:2004/user/login', data).subscribe(
      (response: any) => {
        if (response.success) {
          alert(response.message);
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId);
          this.router.navigate(['/home']);
        } else {
          alert(response.message);
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error during login:', error);
        if (error.status === 401) {
          alert('Helytelen email vagy jelszó!');
        } else {
          alert('Hiba történt a bejelentkezés során.');
        }
      }
    );
  }
}
