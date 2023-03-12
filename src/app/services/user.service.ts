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

  getUsersByStatus(status: string) {
    const userRef = collection(this.firestore, 'users');
    const whereCond = query(userRef, where('status', '==', status));
    return collectionData(whereCond, { idField: 'id' });
  }

  getAllUsers() {
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, { idField: 'id' });
  }

  updateUserStatus(userId: string, status: string) {
    const userRef = doc(this.firestore, 'users/' + userId);
    if (status === 'deleted') {
      return deleteDoc(userRef);
    }
    const updateKey = `${status}On`;
    return updateDoc(userRef, {
      status,
      [updateKey]: new Date().toISOString(),
    });
  }
}
