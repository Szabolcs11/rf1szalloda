import { Component, OnInit } from '@angular/core';
import { RealestateCardComponent } from '../realestate-card/realestate-card.component';
import { Realestate } from '../realestate';
import { RealestateService } from '../realestate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-realestate-list',
  standalone: true,
  imports: [RealestateCardComponent, CommonModule],
  templateUrl: './admin-realestate-list.component.html',
  styleUrl: './admin-realestate-list.component.css'
})
export class AdminRealestateListComponent implements OnInit {
  parent: boolean = false;
  realestates: Realestate[] = [];

  constructor(private realestateService: RealestateService) {}

  ngOnInit(): void {
    this.realestateService.getRealEstates().subscribe((res: any) => {
      this.realestates = res.realEstates.reverse();
    });
  }
}
