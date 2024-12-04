import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MyProfileComponent } from '../my-profile/my-profile.component';
import { Realestate } from '../realestate';
import { RealestateCardComponent } from '../realestate-card/realestate-card.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MyProfileComponent,
    RealestateCardComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userId!: number;
  userData: any = {};
  showUpdateSection: boolean = false;
  myProperties: Realestate[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const idParam = this.route.snapshot.params['id'];
    if (idParam !== undefined) {
      this.userId = +idParam;
      this.getUserProfile();
    } else {
      alert('Felhasználó ID nem található.');
    }
  }

  getUserProfile() {
    this.http
      .get(`https://rf1.dev.kokeny-szabolcs.hu/user/profile/${this.userId}`)
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.userData = response.user;
            this.myProperties = response.user.realEstates;
          } else {
            alert(
              response.message || 'Nem sikerült lekérni a profil adatokat.'
            );
          }
        },
        (error) => {
          console.error('Error fetching user profile:', error);
          if (error.status === 404) {
            alert('Felhasználó nem található.');
          } else {
            alert('Hiba történt a profil adatainak lekérése során.');
          }
        }
      );
  }

  toggleUpdateSection(): void {
    this.showUpdateSection = !this.showUpdateSection;
  }
}
