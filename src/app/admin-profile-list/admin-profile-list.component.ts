import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { User } from '../User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-profile-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './admin-profile-list.component.html',
  styleUrls: ['./admin-profile-list.component.css'],
})
export class AdminProfileListComponent implements OnInit {
  userList: User[] = [];
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getUsers().subscribe((res: any) => {
      console.log(res);
      this.userList = res.users;
    });
  }

  deleteUser(id: number): void {
    this.adminService.deleteUser(id).subscribe((res: any) => {
      console.log(res.message);
      this.ngOnInit();
    });
  }
}
