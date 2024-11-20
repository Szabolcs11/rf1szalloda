import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Realestate } from '../realestate';
import { RealestateService } from '../realestate.service';

@Component({
  selector: 'app-realestate',
  standalone: true,
  imports: [],
  templateUrl: './realestate.component.html',
  styleUrl: './realestate.component.css',
})
export class RealestateComponent implements OnInit {
  realestates: Realestate[] = [];
  realestate?: Realestate;
  constructor(
    private realestateService: RealestateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const realestateId = this.route.snapshot.params['id'];

    this.realestateService.getRealEstates().subscribe((res: any) => {
      this.realestates = res.realEstates;
      this.realestate = this.realestates.find(
        (obj: any) => obj.id == realestateId
      );
    });
  }
}
