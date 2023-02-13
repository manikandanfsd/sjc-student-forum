import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
})
export class UserManagementPage implements OnInit {
  activeUserList: any = [];
  inActiveUserList: any = [];
  userList: any = [];
  activeTab: any = 'inactive';
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getActiveUsers();
    this.getInActiveUsers();
  }

  handleChange(e: any) {
    this.activeTab = e.target.value;
    if (this.activeTab === 'active') {
      this.getActiveUsers();
    } else {
      this.getInActiveUsers();
    }
  }

  getActiveUsers() {
    this.userService.getActiveUsers().subscribe((result) => {
      this.userList = result;
    });
  }

  getInActiveUsers() {
    this.userService.getAllUsers().subscribe((result) => {
      this.userList = result;
    });
  }

  handleRefresh(event: any) {
    if (this.activeTab === 'active') {
      this.getActiveUsers();
    } else {
      this.getInActiveUsers();
    }
    event.target.complete();
  }
}
