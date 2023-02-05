import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-post',
  templateUrl: './add-edit-post.page.html',
  styleUrls: ['./add-edit-post.page.scss'],
})
export class AddEditPostPage implements OnInit {
  title: any;
  description: any;
  isPreviewVisible: boolean = false;

  bgColors = [
    'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
    'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)',
    'linear-gradient(to right, #11998e, #38ef7d)',
    'linear-gradient(to top, #00c6fb 0%, #005bea 100%)',
    'linear-gradient(to top, #9795f0 0%, #fbc8d4 100%)',
    'linear-gradient(to top, #ff0844 0%, #ffb199 100%)',
    'linear-gradient(to top, #0fd850 0%, #f9f047 100%)',
    'linear-gradient(-225deg, #3D4E81 0%, #5753C9 48%, #6E7FF3 100%)',
  ];
  selectedColor = this.bgColors[0];
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
