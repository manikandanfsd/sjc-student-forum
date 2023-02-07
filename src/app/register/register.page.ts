import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

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
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      role: ['', [Validators.required]],
      name: ['', [Validators.required]],
      idNo: ['', [Validators.required]],
      email: ['', [Validators.required]],
      isActive: [false, [Validators.required]],
      designation: ['', [Validators.required]],
      department: ['', [Validators.required]],
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

  handlePasswordToggle() {
    this.passwordVisibility = !this.passwordVisibility;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Register Successfully',
      duration: 1500,
      icon: 'checkmark-circle',
      position: 'bottom',
      color: 'success',
    });

    await toast.present();
  }

  submitForm() {
    this.registerForm.markAllAsTouched();
    this.registerForm.updateValueAndValidity();
    if (this.registerForm.valid) {
      this.showLoading();
      this.authService.register(this.registerForm.value).then((result) => {
        this.loadingInst.dismiss();
        this.router.navigate(['/login']);
        this.presentToast();
      });
    }
  }
}
