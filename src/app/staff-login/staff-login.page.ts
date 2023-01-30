import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.page.html',
  styleUrls: ['./staff-login.page.scss'],
})
export class StaffLoginPage implements OnInit {
  passwordVisibility: boolean = false;
  constructor() {}

  ngOnInit() {}

  handlePasswordToggle() {
    this.passwordVisibility = !this.passwordVisibility;
  }
}
