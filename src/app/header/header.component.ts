import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isBurgerMenuOpen: boolean = false;
  userID: string | null = null;
  constructor(private router: Router, private userService: UserService) {
    this.userService.userId$.subscribe((userId) => {
      this.userID = userId;
    });
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  toggleBurgerMenu(): void {
    this.isBurgerMenuOpen = !this.isBurgerMenuOpen;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/home']);
  }
}
