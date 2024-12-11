import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class MyProfileComponent implements OnInit {
  userData: any = {
    Name: '',
    Email: '',
    Phone: '',
    AvatarURL: '',
    Description: '',
  };

  passwordData: any = {
    OldPassword: '',
    NewPassword: '',
    NewPasswordAgain: '',
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Kérjük, jelentkezzen be a profil megtekintéséhez.');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get('http://localhost:2004/user/profile', { headers }).subscribe(
      (response: any) => {
        if (response.success) {
          this.userData = response.user;
        } else {
          alert('Nem sikerült lekérni a profil adatokat.');
        }
      },
      (error) => {
        console.error('Error fetching profile:', error);
        alert('Hiba történt a profil adatainak lekérése során.');
      }
    );
  }

  onSubmit(form: any) {
    if (form.invalid) {
      alert('Kérjük, töltse ki az összes kötelező mezőt.');
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      alert('Kérjük, jelentkezzen be a profil szerkesztéséhez.');
      this.router.navigate(['/login']);
      return;
    }

    if (this.passwordData.NewPassword || this.passwordData.NewPasswordAgain) {
      if (
        this.passwordData.NewPassword !== this.passwordData.NewPasswordAgain
      ) {
        alert('Az új jelszavak nem egyeznek meg.');
        return;
      }

      if (this.passwordData.NewPassword.length < 6) {
        alert('Az új jelszónak legalább 6 karakter hosszúnak kell lennie.');
        return;
      }
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const requestData: any = {
      Name: this.userData.Name,
      Email: this.userData.Email,
      Phone: this.userData.Phone,
      AvatarURL: this.userData.AvatarURL,
      Description: this.userData.Description,
    };

    if (
      this.passwordData.OldPassword &&
      this.passwordData.NewPassword &&
      this.passwordData.NewPasswordAgain
    ) {
      requestData.OldPassword = this.passwordData.OldPassword;
      requestData.NewPassword = this.passwordData.NewPassword;
      requestData.NewPasswordAgain = this.passwordData.NewPasswordAgain;
    }

    this.http
      .post('http://localhost:2004/user/update', requestData, { headers })
      .subscribe(
        (response: any) => {
          if (response.success) {
            alert(response.message);

            if (response.passwordChanged) {
              localStorage.removeItem('token');
              alert(
                'A jelszavad megváltozott. Kérjük, jelentkezz be újra az új jelszavaddal.'
              );
              this.router.navigate(['/login']);
            } else {
              this.getUserProfile();
            }

            this.passwordData = {
              OldPassword: '',
              NewPassword: '',
              NewPasswordAgain: '',
            };
          } else {
            alert(
              response.message || 'Nem sikerült frissíteni a profil adatokat.'
            );
          }
        },
        (error) => {
          console.error('Error updating profile:', error);
          alert('Hiba történt a profil frissítése során.');
        }
      );
  }
}
