import { Component, OnInit } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-tab-layout',
  templateUrl: './tab-layout.page.html',
  styleUrls: ['./tab-layout.page.scss'],
})
export class TabLayoutPage implements OnInit {
  constructor() {}

  ngOnInit() {
    StatusBar.setBackgroundColor({ color: '#7c5dfa' });
    StatusBar.setStyle({ style: Style.Dark });
  }
}
