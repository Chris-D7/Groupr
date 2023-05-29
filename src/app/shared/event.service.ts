import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, doc, docData, Firestore, setDoc, QuerySnapshot, query, where, getDocs, getDoc, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { deleteDoc } from "firebase/firestore";
import { Eventcollection } from 'src/models/eventcollection';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private firestore: Firestore) { }

  getEvent():Observable<Eventcollection[]>{
    console.log(this.firestore);
    const myCollection: any = collection(this.firestore, 'Events');
    return collectionData(myCollection);
  }

  addEvent(event: Eventcollection){
    const myCollection = collection(this.firestore, "Events");
    addDoc(myCollection, event);
  }

  async updateEvent(event: Eventcollection){
  const q = query(collection(this.firestore, "Events"), where("id", "==", event.id));
  const querySnapshot = await getDocs(q);
  let id:string="";
  querySnapshot.forEach((doc) => {
    id=doc.id;
  });
  await setDoc(doc(this.firestore, "Events", id), event);
  }

  async getEventGroup(group:string): Promise<Eventcollection[]>{
    const q = query(collection(this.firestore, "Events"), where("group", "==", group));
    const querySnapshot = await getDocs(q);
    let id:string="";
    let eventcollection:Eventcollection[]=[];
    querySnapshot.forEach((doc) => {
      eventcollection.push(doc as unknown as Eventcollection);
    });
    return eventcollection;
  }

  async getEventOnID(id:string){
    const q = query(collection(this.firestore, "Events"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    let evnt:Eventcollection = {times: [], desc: '', group: '', owner: {email: '', username: ''}, title: '', id: ''};
    querySnapshot.forEach((doc) => {
      evnt=doc as unknown as Eventcollection;
    });
    return evnt;
  }

  async updateEventTime(event: Eventcollection, email:string, username:string, time: number[], day: Date){
    const q = query(collection(this.firestore, "Events"), where("id", "==", event.id));
    const querySnapshot = await getDocs(q);
    let id:string="";
    querySnapshot.forEach((doc) => {
      id=doc.id;
    });
    const updatedTimes = event.times || []; 

    updatedTimes.push({ email: email, username: username, time: time, day:day }); 

    await updateDoc(doc(this.firestore, "Events", id), { times: updatedTimes });
    //await updateDoc(doc(this.firestore, "Events", id), {times: {email: email, username: username, time: time}});
  }
}
