import { Component, OnInit } from '@angular/core';
import { RealestateCardComponent } from '../realestate-card/realestate-card.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RealestateService } from '../realestate.service';
import { Realestate } from '../realestate';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RealestateCardComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  realestates: Realestate[] = [];
  sortForm = new FormGroup({
    sortBy: new FormControl('incByPrice'),
  });

  filterForm = new FormGroup({
    city: new FormControl(null),
    room: new FormControl(null),
    pricemin: new FormControl(null),
    pricemax: new FormControl(null),
    areamin: new FormControl(null),
    areamax: new FormControl(null),
  });

  constructor(private realestateService: RealestateService) {}

  ngOnInit(): void {
    this.getRealestates();
  }

  getRealestates(): void {
    this.realestateService.getRealEstates().subscribe((res: any) => {
      this.realestates = res.realEstates;
    });
    this.filterForm.reset();
  }
  sortRealestates(order: string | null): void {
    if (order === 'incByPrice') {
      this.realestates.sort((a, b) => a.Price - b.Price);
    } else if (order === 'decByPrice') {
      this.realestates.sort((a, b) => b.Price - a.Price);
    } else if (order === 'incByArea') {
      this.realestates.sort((a, b) => a.SquareMeters - b.SquareMeters);
    } else if (order === 'decByArea') {
      this.realestates.sort((a, b) => b.SquareMeters - a.SquareMeters);
    } else if (order === 'incByRooms') {
      this.realestates.sort((a, b) => a.Rooms - b.Rooms);
    } else if (order === 'decByRooms') {
      this.realestates.sort((a, b) => b.Rooms - a.Rooms);
    }
  }

  filterRealestates(): void {
    const city = this.filterForm.controls.city.value;
    const room = this.filterForm.controls.room.value;
    const pricemin = this.filterForm.controls.pricemin.value;
    const pricemax = this.filterForm.controls.pricemax.value;
    const areamin = this.filterForm.controls.areamin.value;
    const areamax = this.filterForm.controls.areamax.value;

    this.realestates = this.realestates.filter((realestate) => {
      const matchesCity = city ? realestate.City.includes(city) : true;
      const matchesRoom = room ? realestate.Rooms === +room : true;
      const matchesPriceMin = pricemin ? realestate.Price >= +pricemin : true;
      const matchesPriceMax = pricemax ? realestate.Price <= +pricemax : true;
      const matchesAreaMin = areamin
        ? realestate.SquareMeters >= +areamin
        : true;
      const matchesAreaMax = areamax
        ? realestate.SquareMeters <= +areamax
        : true;

      return (
        matchesCity &&
        matchesRoom &&
        matchesPriceMin &&
        matchesPriceMax &&
        matchesAreaMin &&
        matchesAreaMax
      );
    });
  }
}
