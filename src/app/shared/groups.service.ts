import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import {addDoc, collection, collectionData, doc, docData, Firestore, getDocs, query, setDoc, where} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Groupscollection } from 'src/models/groupscollection';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private firestore: Firestore) { }

    getGroup():Observable<Groupscollection[]>{
      console.log(this.firestore);
      const myCollection: any = collection(this.firestore, 'Groups');
      return collectionData(myCollection);
    }

    addGroup(group: Groupscollection){
      const myCollection = collection(this.firestore, 'Groups');
      addDoc(myCollection, group);
    }

    async updateGroup(group: Groupscollection){
      const q = query(collection(this.firestore, "Groups"), where("id", "==", group.id));
      const querySnapshot = await getDocs(q);
      let id:string="";
      querySnapshot.forEach((doc) => {
        id=doc.id;
      });
      await setDoc(doc(this.firestore, "Groups", id), group);
    }
}
