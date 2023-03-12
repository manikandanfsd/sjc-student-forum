import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  postList: any = [];
  searchResult: any = [];
  searching: boolean = false;
  noResult: boolean = false;
  loadingInst: any;

  constructor(
    private postService: PostService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.getPosts();
  }

  async showLoading() {
    this.loadingInst = await this.loadingCtrl.create({
      message: 'Searching...',
    });
    this.loadingInst.present();
  }

  async searchValue(event: any) {
    const searchTxt = event.target.value;
    if (searchTxt.length > 2) {
      this.searching = true;
      await this.showLoading();
      this.searchResult = this.postList.filter((post: any) => {
        return post.title.toLowerCase().includes(searchTxt.toLowerCase());
      });
      setTimeout(() => {
        this.searching = false;
        this.loadingInst.dismiss();
        this.noResult = this.searchResult.length === 0;
      }, 1000);
    }
    if (searchTxt.length === 0) {
      this.searchResult = [];
      this.searching = false;
      this.noResult = false;
    }
  }

  getPosts() {
    this.postService.getPost().subscribe((result) => {
      this.postList = result;
    });
  }
}
