import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule],
})
export class RegistrationComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  passwordAgain: string = '';
  constructor(private http: HttpClient, private router: Router) {}

  register() {
    if (this.password !== this.passwordAgain) {
      alert('A jelszavak nem egyeznek!');
      return;
    }

    const data = {
      Name: this.name,
      Email: this.email,
      Password: this.password,
      PasswordAgain: this.passwordAgain,
      Phone: this.phone,
    };

    this.http.post('http://localhost:2004/user/register', data).subscribe(
      (response: any) => {
        if (response.success) {
          alert(response.message);
          this.router.navigate(['/login']);
        } else {
          alert(response.message);
        }
      },
      (error) => {
        console.error('Error during registration:', error);
        alert('Hiba történt a regisztráció során.');
      }
    );
  }
}
