import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  passwordVisibility: boolean = false;
  loadingInst: any;
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      role: ['', [Validators.required]],
      name: ['', [Validators.required]],
      idNo: ['', [Validators.required]],
      email: ['', [Validators.required]],
      status: ['pending', [Validators.required]],
      designation: ['', [Validators.required]],
      department: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    if (StatusBar) {
      StatusBar.setBackgroundColor({ color: '#7c5dfa' });
      StatusBar.setStyle({ style: Style.Dark });
    }
  }

  async showLoading() {
    this.loadingInst = await this.loadingCtrl.create({
      message: 'Loading...',
      showBackdrop: true,
    });
    this.loadingInst.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Register Failed',
      message: 'Email already in use. Please try again with a different email.',
      buttons: ['OK'],
    });
    alert.present();
  }

  handlePasswordToggle() {
    this.passwordVisibility = !this.passwordVisibility;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Register Successfully',
      duration: 1500,
      icon: 'checkmark-circle',
      position: 'top',
      color: 'success',
    });
    await toast.present();
  }

  async submitForm() {
    this.registerForm.markAllAsTouched();
    this.registerForm.updateValueAndValidity();
    if (this.registerForm.valid) {
      this.showLoading();
      const emailAlreadyExits = await firstValueFrom(
        this.authService.checkEmailExits(
          this.registerForm?.value?.email?.toLowerCase()
        )
      );
      if (emailAlreadyExits && emailAlreadyExits.length > 0) {
        this.loadingInst.dismiss();
        this.presentAlert();
      } else {
        const payload = {
          ...this.registerForm.value,
          email: this.registerForm.value.email.toLowerCase(),
        };
        this.authService.register(payload).then((result) => {
          this.registerForm.reset();
          this.loadingInst.dismiss();
          this.router.navigate(['/login']);
          this.presentToast();
        });
      }
    }
  }
}
