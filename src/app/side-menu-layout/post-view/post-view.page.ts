import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PostService } from 'src/app/services/post.service';
import { Storage } from '@ionic/storage-angular';
import { take } from 'rxjs';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.page.html',
  styleUrls: ['./post-view.page.scss'],
})
export class PostViewPage implements OnInit {
  loadingInst: any;
  postInfo: any = {};
  userInfo: any = {};
  comment: any = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private postService: PostService,
    private storage: Storage
  ) {}

  ionViewDidEnter() {
    this.storage.get('userInfo').then((res: any) => {
      this.userInfo = res;
    });
  }

  async showLoading() {
    this.loadingInst = await this.loadingCtrl.create({
      message: 'Loading...',
      showBackdrop: true,
    });
    this.loadingInst.present();
  }

  async ngOnInit() {
    await this.showLoading();
    const { postId } = this.activatedRoute.snapshot.params;
    this.postService
      .getPostById(postId)
      .pipe(take(1))
      .subscribe((result) => {
        this.postInfo = result;
        this.loadingInst.dismiss();
      });
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

  sendComment() {
    console.log(this.comment);
    if (this.comment) {
      if (this.postInfo.comments) {
        this.postInfo.comments.push({
          text: this.comment,
          userInfo: this.userInfo,
        });
      }
      this.postService.updatePost(this.postInfo).then((result) => {
        console.log(result, 'save result');
        this.comment = '';
      });
    }
  }
}
