import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  passwordVisibility: boolean = false;
  email: string = '';
  password: string = '';
  loadingInst: any;
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private storage: Storage,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  async showLoading() {
    this.loadingInst = await this.loadingCtrl.create({
      message: 'Loading...',
      showBackdrop: true,
    });
    this.loadingInst.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Login',
      message: 'Invalid email & password',
      buttons: ['OK'],
    });

    alert.present();
  }

  doLogin() {
    this.loginForm.markAllAsTouched();
    this.loginForm.updateValueAndValidity();
    if (this.loginForm.valid) {
      this.showLoading();
      this.authService
        .login(this.email, this.password)
        .subscribe((result: any) => {
          this.loadingInst.dismiss();
          if (result && result.length > 0) {
            this.storage.set('userInfo', {
              name: result[0].name,
              email: result[0].email,
              role: result[0].role,
            });
            this.router.navigate(['/menu-layout']);
          } else {
            this.presentAlert();
          }
        });
    }
  }

  handlePasswordToggle() {
    this.passwordVisibility = !this.passwordVisibility;
  }
}
