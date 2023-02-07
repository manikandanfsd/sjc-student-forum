import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.page.html',
  styleUrls: ['./startup.page.scss'],
})
export class StartupPage implements OnInit {
  constructor(private storage: Storage, private router: Router) {}

  ngOnInit() {
    this.storage.get('userInfo').then((res: any) => {
      console.log(res, 'res');
      if (res) {
        this.router.navigate(['/menu-layout']);
      }
    });
    if (StatusBar) {
      StatusBar.setStyle({ style: Style.Light });
      StatusBar.setBackgroundColor({ color: '#ffffff' });
    }
  }
}
