import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  burgerClickCounter: number = 0;
  hideBurger: boolean = true;

  constructor() {}

  burgerClick(): void {
    this.burgerClickCounter++;
    if (this.burgerClickCounter % 2 == 0) {
      this.hideBurger = true;
      this.burgerClickCounter = 0;
    } else this.hideBurger = false;
  }
}
