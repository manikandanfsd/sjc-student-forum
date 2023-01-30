import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.page.html',
  styleUrls: ['./student-login.page.scss'],
})
export class StudentLoginPage implements OnInit {
  passwordVisibility: boolean = false;
  constructor() {}

  ngOnInit() {}

  handlePasswordToggle() {
    this.passwordVisibility = !this.passwordVisibility;
  }
}
