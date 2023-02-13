import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PostService } from 'src/app/services/post.service';
import { Storage } from '@ionic/storage-angular';
import { take } from 'rxjs';

@Component({
  selector: 'app-my-feeds',
  templateUrl: './my-feeds.page.html',
  styleUrls: ['./my-feeds.page.scss'],
})
export class MyFeedsPage implements OnInit {
  userInfo: any = {};
  loadingInst: any;
  myPosts: any = [];

  constructor(
    private storage: Storage,
    private postService: PostService,
    private loadingCtrl: LoadingController
  ) {}

  async showLoading() {
    this.loadingInst = await this.loadingCtrl.create({
      message: 'Loading...',
      showBackdrop: true,
    });
    this.loadingInst.present();
  }

  async ionViewDidEnter() {
    await this.showLoading();
    this.storage.get('userInfo').then((res: any) => {
      this.userInfo = res;
      this.postService
        .getPostByUserId(this.userInfo.id)
        .pipe(take(1))
        .subscribe((result) => {
          this.myPosts = result;
          this.loadingInst.dismiss();
        });
    });
  }
  ngOnInit() {}

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
}
