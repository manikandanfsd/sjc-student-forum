import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  passwordVisibility: boolean = false;
  loadingInst: any;
  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      role: ['', [Validators.required]],
      name: ['', [Validators.required]],
      idNo: ['', [Validators.required]],
      email: ['', [Validators.required]],
      status: ['active', [Validators.required]],
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

  handleSelectChange() {
    this.userForm.get('department')?.setValue('');
  }

  handlePasswordToggle() {
    this.passwordVisibility = !this.passwordVisibility;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Add User Failed',
      message: 'Email already in use. Please try again with a different email.',
      buttons: ['OK'],
    });
    alert.present();
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
    this.userForm.markAllAsTouched();
    this.userForm.updateValueAndValidity();
    if (this.userForm.valid) {
      this.showLoading();
      const emailAlreadyExits = await firstValueFrom(
        this.authService.checkEmailExits(this.userForm.value.email)
      );
      if (emailAlreadyExits && emailAlreadyExits.length > 0) {
        this.loadingInst.dismiss();
        this.presentAlert();
      } else {
        this.authService.register(this.userForm.value).then((result) => {
          this.loadingInst.dismiss();
          this.router.navigate(['/login']);
          this.presentToast();
        });
      }
    }
  }
}
