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
}
