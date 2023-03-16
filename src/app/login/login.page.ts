import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

const errorMessageMapper: any = {
  invalid: 'Invalid email & password',
  inactive:
    'Your account is currently inactive. Please contact support for assistance.',
  pending:
    'Your account is still pending approval. Contact support for assistance.',
  deleted:
    'Your account has been disabled. Please contact support for assistance.',
  spam: 'Account flagged for spam. Contact support for help.',
};

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

  async presentAlert(alertType: any = 'invalid') {
    const alert = await this.alertController.create({
      header: 'Login Failed',
      message: errorMessageMapper[alertType],
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
      firstValueFrom(
        this.authService.login(email?.toLowerCase(), password)
      ).then(async (result: any) => {
        this.loadingInst.dismiss();
        if (result && result.length > 0) {
          const { name, email, role, idNo, id, status } = result[0];
          if (status === 'active') {
            await this.storage.set('userInfo', {
              name: name,
              email: email,
              role: role,
              idNo: idNo,
              id: id,
            });
            this.loginForm.reset();
            this.router.navigate([
              '/menu-layout/tab-layout/home',
              { state: { timestamp: new Date().toTimeString() } },
            ]);
          } else {
            this.presentAlert(status);
          }
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
