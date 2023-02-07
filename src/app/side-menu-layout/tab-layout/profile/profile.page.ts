import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { take } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileInfo: any = {};
  loadingInst: any;
  constructor(
    private storage: Storage,
    private userService: UserService,
    private loadingCtrl: LoadingController
  ) {}

  async showLoading() {
    this.loadingInst = await this.loadingCtrl.create({
      message: 'Loading...',
      showBackdrop: true,
    });
    this.loadingInst.present();
  }

  async ionViewDidEnter() {
    await this.showLoading();
    this.storage.get('userInfo').then((userInfo: any) => {
      this.userService
        .getProfile(userInfo.id)
        .pipe(take(1))
        .subscribe((result) => {
          this.profileInfo = result;
          this.loadingInst.dismiss();
        });
    });
  }

  ngOnInit() {}
}
