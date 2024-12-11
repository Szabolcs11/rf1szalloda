import { Component, OnInit } from '@angular/core';
import { RealestateCardComponent } from '../realestate-card/realestate-card.component';
import { Realestate } from '../realestate';
import { RealestateService } from '../realestate.service';
import { CommonModule } from '@angular/common';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-realestate-list',
  standalone: true,
  imports: [RealestateCardComponent, CommonModule],
  templateUrl: './admin-realestate-list.component.html',
  styleUrl: './admin-realestate-list.component.css',
})
export class AdminRealestateListComponent implements OnInit {
  parent: boolean = false;
  realestates: Realestate[] = [];

  constructor(
    private realestateService: RealestateService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.realestateService.getRealEstates().subscribe((res: any) => {
      this.realestates = res.realEstates.reverse();
    });
  }

  deleteRealestate(id: number) {
    this.adminService.deleteRealestate(id).subscribe((res: any) => {
      console.log(res.message);
      this.ngOnInit();
    });
  }
}
