import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu-layout',
  templateUrl: './side-menu-layout.page.html',
  styleUrls: ['./side-menu-layout.page.scss'],
})
export class SideMenuLayoutPage implements OnInit {
  public appPages = [
    // { title: 'Switch Theme', url: '/folder/Inbox', icon: 'contrast' },xs
    {
      title: 'My Feeds',
      url: '/menu-layout/tab-layout/Outbox',
      icon: 'newspaper',
    },
    { title: 'Saved', url: '/menu-layout/tab-layout/saved', icon: 'bookmarks' },
    {
      title: 'Circular',
      url: '/menu-layout/tab-layout/announcement',
      icon: 'document-text',
    },
    { title: 'Help', url: '/folder/Trash', icon: 'help-circle' },
    { title: 'Signout', url: '/startup', icon: 'log-out' },
  ];

  constructor() {}

  ngOnInit() {}
}
