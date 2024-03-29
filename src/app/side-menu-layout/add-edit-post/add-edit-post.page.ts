import { Component, OnInit } from '@angular/core';
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  Storage as FbStorage,
} from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-edit-post',
  templateUrl: './add-edit-post.page.html',
  styleUrls: ['./add-edit-post.page.scss'],
})
export class AddEditPostPage implements OnInit {
  isPreviewVisible: boolean = false;
  userInfo: any = {};
  postForm!: FormGroup;
  files: any;
  fileProcess: any = {};
  fileInfoData: any = {};
  bannerImg: any;
  bgColors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)',
    'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
    'linear-gradient(to top, #cd9cf2 0%, #f6f3ff 100%)',
    'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)',
    'linear-gradient(to right, #11998e, #38ef7d)',
    'linear-gradient(60deg, #abecd6 0%, #fbed96 100%)',
    'linear-gradient(to top, #9795f0 0%, #fbc8d4 100%)',
    'linear-gradient(to top, #00c6fb 0%, #005bea 100%)',
    'linear-gradient(to top, #9795f0 0%, #fbc8d4 100%)',
    'linear-gradient(to top, #0fd850 0%, #f9f047 100%)',
    'linear-gradient(-225deg, #3D4E81 0%, #5753C9 48%, #6E7FF3 100%)',
    'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)',
    'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)',
    'linear-gradient(90deg, #3F2B96 0%, #A8C0FF 100%)',
    'linear-gradient(90deg, #FDBB2D 0%, #22C1C3 100%)',
    'linear-gradient(90deg, #0700b8 0%, #00ff88 100%)',
    'linear-gradient(90deg, #d53369 0%, #daae51 100%)',
    'linear-gradient(to top, #e6b980 0%, #eacda3 100%)',
    'linear-gradient(-225deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%)',
    'linear-gradient( 68.3deg,  rgba(245,177,97,1) 0.4%, rgba(236,54,110,1) 100.2% )',
  ];
  selectedColor = this.bgColors[0];
  loadingInst: any;

  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      // [{ direction: 'rtl' }], // text direction
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'], // remove formatting button

      ['link', 'video'], // link and image, video
    ],
  };
  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private router: Router,
    private storage: Storage,
    private postService: PostService,
    private fbStorage: FbStorage
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      bgColor: [this.selectedColor],
      bgImg: [''],
      comments: [[]],
      likes: [{}],
      saved: [{}],
      attachments: [[]],
      postedOn: [new Date().toISOString()],
      postedBy: [''],
    });
  }

  ionViewDidEnter() {
    this.storage.get('userInfo').then((res: any) => {
      this.userInfo = res;
    });
  }

  ngOnInit() {}

  selectBgColor(colorCode: any) {
    this.selectedColor = colorCode;
    this.postForm.patchValue({ bgColor: colorCode });
  }

  async showLoading(text = 'Posting...') {
    this.loadingInst = await this.loadingCtrl.create({
      message: text,
      showBackdrop: true,
    });
    this.loadingInst.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Post Successfully',
      duration: 1500,
      icon: 'checkmark-circle',
      position: 'top',
      color: 'success',
    });

    await toast.present();
  }

  previewPost() {
    this.postForm.markAllAsTouched();
    this.postForm.updateValueAndValidity();
    if (this.postForm.valid) {
      this.isPreviewVisible = true;
    }
  }

  fileChanges(event: any) {
    this.files = event.target.files;
  }

  bannerImage(event: any) {
    this.bannerImg = event.target.files[0];
  }

  async uploadBannerFile() {
    await this.showLoading('Uploading...');
    const storageRef = ref(
      this.fbStorage,
      '/sjc-student-forum/' + this.bannerImg.name
    );
    const uploadTask = uploadBytesResumable(storageRef, this.bannerImg);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error.message, 'error.message');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.postForm.patchValue({ bgImg: downloadURL });
          this.loadingInst.dismiss();
        });
      }
    );
  }

  async uploadFiles() {
    await this.showLoading('Uploading...');
    this.fileInfoData = {};
    for (const file of this.files) {
      const storageRef = ref(this.fbStorage, '/sjc-student-forum/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          this.fileProcess[file.name] =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(this.fileProcess, 'this.fileProcess');
        },
        (error) => {
          console.log(error.message, 'error.message');
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.fileInfoData[file.name] = {
              downloadURL,
              name: file.name,
              type: file.type,
              size: file.size,
            };
            console.log('File available at', Object.values(this.fileInfoData));

            if (this.files.length === Object.values(this.fileInfoData).length) {
              this.loadingInst.dismiss();
            }
          });
        }
      );
    }
  }

  async savePost() {
    this.postForm.markAllAsTouched();
    this.postForm.updateValueAndValidity();
    const payload = this.postForm.value;
    payload.postedBy = this.userInfo;
    payload.postedOn = new Date().toISOString();
    payload.updatedOn = new Date().toISOString();
    payload.attachments = Object.values(this.fileInfoData);
    if (this.postForm.valid) {
      await this.showLoading();
      this.postForm.reset();
      this.postService.savePost(payload).then((result) => {
        this.loadingInst.dismiss();
        this.router.navigate([
          '/menu-layout/tab-layout/',
          { state: { timestamp: new Date().toTimeString() } },
        ]);
        this.presentToast();
      });
    }
  }
}
