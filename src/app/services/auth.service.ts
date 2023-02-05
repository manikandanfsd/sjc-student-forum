import { Injectable } from '@angular/core';

import {
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  deleteDoc,
  getDoc,
  updateDoc,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';

import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private firestore: Firestore) {}

  login(email: string, password: string) {
    const userRef = collection(this.firestore, 'users');
    const whereCond = query(
      userRef,
      where('email', '==', email),
      where('password', '==', password)
    );
    return collectionData(whereCond, { idField: 'id' });
  }

  register(userInfo: any) {
    const userRef = collection(this.firestore, 'users');
    return addDoc(userRef, userInfo);
  }
}
