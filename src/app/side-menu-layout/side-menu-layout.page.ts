import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-side-menu-layout',
  templateUrl: './side-menu-layout.page.html',
  styleUrls: ['./side-menu-layout.page.scss'],
})
export class SideMenuLayoutPage implements OnInit {
  appPages = [
    {
      title: 'Home',
      url: '/menu-layout/tab-layout/home',
      icon: 'home',
    },
    {
      title: 'My Feeds',
      url: '/menu-layout/tab-layout/my-feeds',
      icon: 'newspaper',
    },
    { title: 'Saved', url: '/menu-layout/tab-layout/saved', icon: 'bookmarks' },
    // {
    //   title: 'Circular',
    //   url: '/menu-layout/tab-layout/announcement',
    //   icon: 'document-text',
    // },
    {
      title: 'Users Management',
      url: '/menu-layout/user-management',
      icon: 'people',
    },
    { title: 'Help', url: '/menu-layout/help', icon: 'help-circle' },
    { title: 'Signout', url: '/login', icon: 'log-out' },
  ];
  userInfo: any = {};
  constructor(
    private router: Router,
    private storage: Storage,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async handleAction(routeLink: string) {
    if (routeLink === '/login') {
      this.showAlert();
    } else {
      this.router.navigate([routeLink]);
    }
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Signout',
      subHeader: 'Are you sure you want to Signout?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: async () => {
            await this.storage.clear();
            const toast = await this.toastController.create({
              message: 'Signout Successfully',
              duration: 2000,
              icon: 'checkmark-circle',
              position: 'top',
              color: 'success',
            });
            await toast.present();
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }

  ionViewDidEnter() {
    this.storage.get('userInfo').then((res: any) => {
      this.userInfo = res;
    });
  }

  ngOnInit() {}
}
