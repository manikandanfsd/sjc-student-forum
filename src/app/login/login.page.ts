import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { firstValueFrom } from 'rxjs';
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
  loginForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private storage: Storage,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

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
      header: 'Login Failed',
      message: 'Invalid email & password',
      buttons: ['OK'],
    });
    alert.present();
  }

  doLogin() {
    this.loginForm.markAllAsTouched();
    this.loginForm.updateValueAndValidity();
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.showLoading();
      firstValueFrom(this.authService.login(email, password)).then(
        async (result: any) => {
          this.loadingInst.dismiss();
          if (result && result.length > 0) {
            await this.storage.set('userInfo', {
              name: result[0].name,
              email: result[0].email,
              role: result[0].role,
              idNo: result[0].idNo,
              id: result[0].id,
            });
            this.loginForm.reset();
            this.router.navigate([
              '/menu-layout',
              { state: { timestamp: new Date().toTimeString() } },
            ]);
          } else {
            this.presentAlert();
          }
        }
      );
    }
  }

  handlePasswordToggle() {
    this.passwordVisibility = !this.passwordVisibility;
  }
}
