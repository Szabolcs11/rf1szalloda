import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { RealestateService } from '../realestate.service';
import { Realestate } from '../realestate';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-realestate-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './realestate-card.component.html',
  styleUrl: './realestate-card.component.css',
  providers: [],
})
export class RealestateCardComponent implements OnInit {
  @Input() parent: boolean = false; //false: home.component a szülő, true: search component a szülő
  @Input() realestates: Realestate[] = [];
  @Input() realestate: any = '';

  constructor(private realestateService: RealestateService) {}

  ngOnInit(): void {}

  sendData(): void {
    this.realestateService.raiseRealestateData(this.realestates);
  }
}
