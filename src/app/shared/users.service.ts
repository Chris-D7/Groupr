import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, doc, docData, Firestore, setDoc, QuerySnapshot, query, where, getDocs, getDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { deleteDoc } from "firebase/firestore";
import { Usercollection } from 'src/models/usercollection';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: Firestore) { }

    getUser():Observable<Usercollection[]>{
      console.log(this.firestore);
      const myCollection: any = collection(this.firestore, 'Users');
      return collectionData(myCollection);
    }

    addUser(user: Usercollection){
      const myCollection = collection(this.firestore, "Users");
      addDoc(myCollection, user);
    }

    async updateUser(user: Usercollection){
    const q = query(collection(this.firestore, "Users"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    let id:string="";
    querySnapshot.forEach((doc) => {
      id=doc.id;
    });
    await setDoc(doc(this.firestore, "Users", id), user);
  }

  async getUserName(email: string){
    const q = query(collection(this.firestore, "Users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      return (doc as unknown as Usercollection).username;
    });
  }
}
