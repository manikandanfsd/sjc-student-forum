import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-post',
  templateUrl: './add-edit-post.page.html',
  styleUrls: ['./add-edit-post.page.scss'],
})
export class AddEditPostPage implements OnInit {
  myPostContent: any;
  isPreviewVisible: boolean = false;
  // myPostContent: any = {
  //   ops: [
  //     { insert: 'Welcome to Studnet Forum' },
  //     { attributes: { header: 2 }, insert: '\n' },
  //     { insert: '\n' },
  //     { attributes: { bold: true }, insert: 'Home' },
  //     { attributes: { list: 'ordered' }, insert: '\n' },
  //     { attributes: { bold: true }, insert: 'About' },
  //     { attributes: { list: 'ordered' }, insert: '\n' },
  //     { attributes: { bold: true }, insert: 'Contact us' },
  //     { attributes: { list: 'ordered' }, insert: '\n' },
  //   ],
  // };
  constructor() {}

  ngOnInit() {}
}
