import { Component, OnInit } from '@angular/core';
import { RealestateCardComponent } from '../realestate-card/realestate-card.component';
import { Realestate } from '../realestate';
import { RealestateService } from '../realestate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RealestateCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  parent: boolean = false;
  realestates: Realestate[] = [];

  constructor(private realestateService: RealestateService) {}

  ngOnInit(): void {
    this.realestateService.getRealEstates().subscribe((res: any) => {
      this.realestates = res.realEstates;
      this.realestates.slice(-4);
    });
  }
}
