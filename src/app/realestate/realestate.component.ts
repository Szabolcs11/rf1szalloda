import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Realestate } from '../realestate';
import { RealestateService } from '../realestate.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-realestate',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './realestate.component.html',
  styleUrls: ['./realestate.component.css'],
})
export class RealestateComponent implements OnInit {
  realestates: Realestate[] = [];
  realestate?: Realestate;
  isReserved: boolean = false;

  constructor(
    private realestateService: RealestateService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const realestateId = this.route.snapshot.params['id'];

    this.realestateService.getRealEstates().subscribe((res: any) => {
      this.realestates = res.realEstates;
      this.realestate = this.realestates.find(
        (obj: any) => obj.id == realestateId
      );
      if (this.realestate) {
        this.isReserved = this.realestate.reserved;
      }
    });
  }

  reserveRealEstate() {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Kérjük, jelentkezzen be a foglaláshoz.');
      return;
    }

    if (!this.realestate) {
      alert('Az ingatlan adatai nem érhetők el.');
      return;
    }

    const data = {
      RealEstateId: this.realestate.id,
    };

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .post('http://localhost:2004/realestate/reserve', data, { headers })
      .subscribe(
        (response: any) => {
          if (response.success) {
            alert(response.message);
            this.realestate!.reserved = true;
            this.isReserved = true;
          } else {
            alert(response.message);
          }
        },
        (error) => {
          console.error('Error during reservation:', error);
          if (error.error && error.error.message) {
            alert(error.error.message);
          } else {
            alert('Hiba történt a foglalás során.');
          }
        }
      );
  }
}
