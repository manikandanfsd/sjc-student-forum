import { Injectable } from '@angular/core';

import {
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  updateDoc,
  Firestore,
  query,
  where,
  limit,
  orderBy,
  deleteDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private firestore: Firestore) {}

  savePost(postInfo: any) {
    const postRef = collection(this.firestore, 'posts');
    return addDoc(postRef, postInfo);
  }

  getPost(after = 0) {
    const postRef = collection(this.firestore, 'posts');
    // const queryObj = query(postRef, orderBy('postedOn', 'desc'), limit(25));
    const queryObj = query(postRef, orderBy('postedOn', 'desc'));
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

  searchPost(searchTxt: any) {
    const postRef = collection(this.firestore, 'posts');
    const queryObj = query(postRef, where('title', '==', searchTxt));
    return collectionData(queryObj, { idField: 'id' });
  }

  deletePost(id: any) {
    const postRef = doc(this.firestore, `posts/${id}`);
    return deleteDoc(postRef);
  }
}
