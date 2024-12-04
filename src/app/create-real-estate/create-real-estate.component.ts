import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-real-estate',
  templateUrl: './create-real-estate.component.html',
  styleUrls: ['./create-real-estate.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class CreateRealEstateComponent implements OnInit {
  city: string = '';
  address: string = '';
  postalCode: string = '';
  price: number | null = null;
  squareMeters: number | null = null;
  description: string = '';
  type: string = '';
  rooms: number | null = null;
  altitude: number | null = null;
  latitude: number | null = null;
  availableFeatures: any[] = [];
  features: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      this.loadFeatures();
    }
  }

  loadFeatures() {
    this.http.get('https://rf1.dev.kokeny-szabolcs.hu/realestate/features').subscribe(
      (response: any) => {
        if (response.success) {
          this.availableFeatures = response.features.map((feature: any) => ({
            id: feature.id,
            name: feature.Name,
            selected: false,
          }));
        } else {
          alert('Nem sikerült betölteni a jellemzőket.');
        }
      },
      (error) => {
        console.error('Error loading features:', error);
      }
    );
  }

  createRealEstate() {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Kérjük, jelentkezzen be az ingatlan létrehozásához.');
      return;
    }

    const selectedFeatures = this.availableFeatures
      .filter((feature) => feature.selected)
      .map((feature) => feature.id);

    const data = {
      City: this.city,
      Address: this.address,
      PostalCode: this.postalCode,
      Price: this.price,
      SquareMeters: this.squareMeters,
      Description: this.description,
      Type: this.type,
      Rooms: this.rooms,
      Altitude: 122,
      Latitude: 123,
      Features: JSON.stringify(selectedFeatures),
    };

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .post('https://rf1.dev.kokeny-szabolcs.hu/realestate/create', data, { headers })
      .subscribe(
        (response: any) => {
          if (response.success) {
            alert(response.message);
            this.resetForm();
          } else {
            alert(response.message);
          }
        },
        (error) => {
          console.error('Error creating real estate:', error);
          alert('Hiba történt az ingatlan létrehozása során.');
        }
      );
  }

  resetForm() {
    this.city = '';
    this.address = '';
    this.postalCode = '';
    this.price = null;
    this.squareMeters = null;
    this.description = '';
    this.type = '';
    this.rooms = null;
    this.altitude = 123;
    this.latitude = 123;
    this.availableFeatures.forEach((feature) => (feature.selected = false));
  }
}
