import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
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
  activeTab: any = 'pending';
  isLoading: boolean = false;
  loadingInst: any;
  constructor(
    private userService: UserService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.getUsersByStatus(this.activeTab);
  }

  async showLoading() {
    this.loadingInst = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.loadingInst.present();
  }

  handleChange(e: any) {
    this.activeTab = e.target.value;
    this.getUsersByStatus(this.activeTab);
  }

  getUsersByStatus(status: string) {
    this.isLoading = true;
    this.userService.getUsersByStatus(status).subscribe((result) => {
      this.userList = result;
      this.isLoading = false;
    });
  }

  async updateUserStatus(userId: string, status: string) {
    await this.showLoading();
    this.userService.updateUserStatus(userId, status).then((result) => {
      this.loadingInst.dismiss();
    });
  }

  handleRefresh(event: any) {
    this.getUsersByStatus(this.activeTab);
    event.target.complete();
  }
}
