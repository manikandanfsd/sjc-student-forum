import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { take } from 'rxjs';
import { PostService } from 'src/app/services/post.service';

import {
  collection,
  collectionData,
  Firestore,
  query,
  where,
  limit,
  orderBy,
  startAfter,
  collectionChanges,
  getDocs,
} from '@angular/fire/firestore';

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
    private loadingCtrl: LoadingController
  ) {
    this.postList = [];
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
