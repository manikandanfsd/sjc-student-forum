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
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  getProfile(userId: string) {
    const userRef = doc(this.firestore, 'users/' + userId);
    return docData(userRef, { idField: 'id' });
  }

  getActiveUsers() {
    const userRef = collection(this.firestore, 'users');
    const whereCond = query(userRef, where('isActive', '==', true));
    return collectionData(whereCond, { idField: 'id' });
  }

  getInActiveUsers() {
    const userRef = collection(this.firestore, 'users');
    const whereCond = query(userRef, where('isActive', '==', false));
    return collectionData(whereCond, { idField: 'id' });
  }

  getAllUsers() {
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, { idField: 'id' });
  }
}
