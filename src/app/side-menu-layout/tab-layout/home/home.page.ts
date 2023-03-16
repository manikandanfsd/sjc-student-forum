import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { take } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { ref, Storage as FbStorage, deleteObject } from '@angular/fire/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userInfo: any = {};
  postList: any = [];
  loadingInst: any;

  constructor(
    private storage: Storage,
    private postService: PostService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private fbStorage: FbStorage
  ) {
    this.postList = [];
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Success! The post has been deleted.',
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    await toast.present();
  }

  async showLoading() {
    this.loadingInst = await this.loadingCtrl.create({
      message: 'Loading...',
      showBackdrop: true,
    });
    this.loadingInst.present();
  }

  ionViewDidEnter() {
    this.storage.get('userInfo').then((res: any) => {
      this.userInfo = res;
    });
  }

  getGreeting() {
    const currentHour = new Date().getHours();
    let greeting = '';
    if (currentHour >= 0 && currentHour < 12) {
      greeting = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }
    return greeting;
  }

  handleRefresh(event: any) {
    event.target.complete();
    this.getPostList();
  }

  async getPostList() {
    await this.showLoading();
    this.postService
      .getPost()
      .pipe(take(1))
      .subscribe((result) => {
        this.postList = result;
        this.loadingInst.dismiss();
      });
  }

  ngOnInit() {
    this.getPostList();
  }

  likeButton(post: any) {
    if (post.likes[this.userInfo.id]) {
      post.likes = {
        ...post.likes,
        [this.userInfo.id]: false,
        count: post.likes.count ? post.likes.count - 1 : 1,
      };
    } else {
      post.likes = {
        ...post.likes,
        [this.userInfo.id]: true,
        count: post.likes.count ? post.likes.count + 1 : 1,
      };
    }
    this.postService.updatePost(post).then((result) => {
      console.log(result, 'like result');
    });
  }

  async deletePost(post: any, index: number) {
    let attachments: any = [];
    await this.showLoading();
    if (post.bgImg) {
      attachments = [post.bgImg.downloadURL];
    }
    if (post?.attachments && post?.attachments?.length > 0) {
      const attachUrls = post?.attachments.map((item: any) => item.downloadURL);
      attachments = [...attachments, ...attachUrls];
    }
    if (attachments.length > 0) {
      attachments.forEach(async (url: any) => {
        const desertRef = ref(this.fbStorage, url);
        deleteObject(desertRef).then((res) => {
          console.log('deleted');
        });
      });
    }
    this.postService.deletePost(post.id).then(async (res) => {
      this.loadingInst.dismiss();
      this.postList.splice(index, 1);
      await this.presentToast();
    });
  }

  saveButton(post: any) {
    if (post.saved[this.userInfo.id]) {
      post.saved = {
        ...post.saved,
        [this.userInfo.id]: false,
        count: post.saved.count ? post.saved.count - 1 : 1,
      };
    } else {
      post.saved = {
        ...post.saved,
        [this.userInfo.id]: true,
        count: post.saved.count ? post.saved.count + 1 : 1,
      };
    }
    this.postService.updatePost(post).then((result) => {
      console.log(result, 'save result');
    });
  }

  generateRandomColor() {
    let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return color;
  }
}
