import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userInfo: any = {};
  postList: any = [];
  constructor(private storage: Storage) {
    this.postList = [
      {
        title: '',
        bannerImg:
          'https://img.freepik.com/free-vector/digital-coding-background-with-numbers-zero-one_1017-30363.jpg?w=1380&t=st=1675019829~exp=1675020429~hmac=5db91240e336f90a98ca7e2b84f9a476423856f0826a49ce1613538833d8252b',
        postedOn: '30/01/2023 12:21 AM',
        postedBy: 'Manikandan',
        postContent: '',
      },

      {
        title: '',
        bannerImg:
          'https://img.freepik.com/free-vector/software-development-illustration-web-developer-programmer-computer_33099-440.jpg?w=1480&t=st=1675021216~exp=1675021816~hmac=bde59fa856c422461a39ec28b19725550bea8a91418602d3213999912f2a7df0',
        postedOn: '30/01/2023 12:21 AM',
        postedBy: 'Shobana',
        postContent: '',
      },

      {
        title: '',
        bannerImg:
          'https://img.freepik.com/free-psd/web-design-studio-landing-page-template_23-2148772439.jpg?w=1380&t=st=1675022896~exp=1675023496~hmac=86c0f32917fdb80ecbdb38e4104b20225a6ab6bb9d6f012d9ebcfc53a241460d',
        postedOn: '30/01/2023 12:21 AM',
        postedBy: 'Shobana',
        postContent: '',
      },
    ];
  }
  ngOnInit() {
    this.storage.get('userInfo').then((res: any) => {
      this.userInfo = res;
    });
  }
}
