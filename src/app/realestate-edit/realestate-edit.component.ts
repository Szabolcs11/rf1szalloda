import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-realestate-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './realestate-edit.component.html',
  styleUrls: ['./realestate-edit.component.css'],
})
export class RealestateEditComponent implements OnInit {
  realEstateId!: number;
  realEstateData: any = {
    City: '',
    PostalCode: '',
    Address: '',
    Rooms: null,
    SquareMeters: null,
    Price: null,
    Type: '',
    Description: '',
    Features: [],
  };
  availableFeatures: any[] = [
    { id: 1, name: 'Lift', key: 'elevator' },
    { id: 2, name: 'Akadálymentesített', key: 'barrierFree' },
    { id: 3, name: 'Erkély', key: 'balcony' },
    { id: 4, name: 'Garázs', key: 'garage' },
  ];
  selectedFeatures: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.params['id'];
    if (idParam !== undefined) {
      this.realEstateId = +idParam;
      this.getRealEstateDetails();
    } else {
      alert('Az ingatlan azonosító nem érhető el.');
      this.router.navigate(['/']);
    }
  }

  getRealEstateDetails() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in.');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http
      .get(`https://rf1.dev.kokeny-szabolcs.hu/realestate/details/${this.realEstateId}`, {
        headers,
      })
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.realEstateData = response.data;

            this.selectedFeatures = this.realEstateData.Features || [];
          } else {
            alert(response.message || 'Failed to fetch real estate details.');
            this.router.navigate(['/']);
          }
        },
        (error) => {
          console.error('Error fetching real estate details:', error);
          if (error.status === 403) {
            alert('You do not have permission to edit this real estate.');
            this.router.navigate(['/']);
          } else if (error.status === 404) {
            alert('Real estate not found.');
            this.router.navigate(['/']);
          } else {
            alert('An error occurred while fetching the real estate details.');
          }
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
      alert('Kérjük, jelentkezzen be.');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const requestData = {
      City: this.realEstateData.City,
      PostalCode: this.realEstateData.PostalCode,
      Address: this.realEstateData.Address,
      Rooms: this.realEstateData.Rooms,
      SquareMeters: this.realEstateData.SquareMeters,
      Price: this.realEstateData.Price,
      Type: this.realEstateData.Type,
      Features: JSON.stringify(this.selectedFeatures),
      Description: this.realEstateData.Description,
    };

    this.http
      .post(
        `https://rf1.dev.kokeny-szabolcs.hu/realestate/update/${this.realEstateId}`,
        requestData,
        { headers }
      )
      .subscribe(
        (response: any) => {
          if (response.success) {
            alert('Ingatlan sikeresen frissítve!');
            this.router.navigate(['/my-realestates']);
          } else {
            alert(
              response.message || 'Nem sikerült frissíteni az ingatlan adatait.'
            );
          }
        },
        (error) => {
          console.error('Error updating real estate:', error);
          if (error.status === 403) {
            alert('Nincs jogosultsága az ingatlan szerkesztéséhez.');
            this.router.navigate(['/']);
          } else {
            alert('Hiba történt az ingatlan frissítése során.');
          }
        }
      );
  }

  toggleFeature(featureId: number) {
    const index = this.selectedFeatures.indexOf(featureId);
    if (index > -1) {
      this.selectedFeatures.splice(index, 1);
    } else {
      this.selectedFeatures.push(featureId);
    }
  }

  isFeatureSelected(featureId: number): boolean {
    return this.selectedFeatures.includes(featureId);
  }
}
