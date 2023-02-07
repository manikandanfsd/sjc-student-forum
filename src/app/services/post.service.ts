import { Injectable } from '@angular/core';

import {
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  deleteDoc,
  getDoc,
  getDocs,
  updateDoc,
  Firestore,
  query,
  where,
  limit,
  orderBy,
  startAfter,
  startAt,
} from '@angular/fire/firestore';

import {
  ref,
  Storage,
  UploadTaskSnapshot,
  storageInstance$,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private firestore: Firestore, private storage: Storage) {}

  savePost(postInfo: any) {
    const postRef = collection(this.firestore, 'posts');
    return addDoc(postRef, postInfo);
  }

  getPost(after = 0) {
    const postRef = collection(this.firestore, 'posts');
    const queryObj = query(postRef, orderBy('postedOn', 'desc'), limit(25));
    return collectionData(queryObj, { idField: 'id' });
  }

  getPostById(postId: string) {
    const postRef = doc(this.firestore, `posts/${postId}`);
    return docData(postRef, { idField: 'id' });
  }

  getPostByUserId(userId: string) {
    const postRef = collection(this.firestore, 'posts');
    const queryObj = query(postRef, where('postedBy.id', '==', userId));
    return collectionData(queryObj, { idField: 'id' });
  }

  getSavedPostByUser(userId: string) {
    const postRef = collection(this.firestore, 'posts');
    const queryObj = query(postRef, where(`saved.${userId}`, '==', true));
    return collectionData(queryObj, { idField: 'id' });
  }

  updatePost(post: any) {
    const postRef = doc(this.firestore, `posts/${post.id}`);
    return updateDoc(postRef, post);
  }

  fileUpload(files: any) {
    const storageRef = ref(this.storage, files.name);
    const uploadTask = uploadBytesResumable(storageRef, files);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress, 'progress');
      },
      (error) => {
        console.log(error.message, 'error.message');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  }
}
