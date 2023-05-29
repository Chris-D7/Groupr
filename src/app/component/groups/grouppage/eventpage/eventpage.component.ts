import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/shared/event.service';
import { GroupsService } from 'src/app/shared/groups.service';
import { UsersService } from 'src/app/shared/users.service';
import { Eventcollection } from 'src/models/eventcollection';
import { Usercollection } from 'src/models/usercollection';

@Component({
  selector: 'app-eventpage',
  templateUrl: './eventpage.component.html',
  styleUrls: ['./eventpage.component.css']
})
export class EventpageComponent implements OnInit{

  constructor(private firestore: Firestore, private active: ActivatedRoute, private groupservice: GroupsService, private router: Router, private userservice:UsersService, private eventservice: EventService, private auth: AngularFireAuth){
  }
  ngOnInit(){
    this.auth.onAuthStateChanged((user)=>{
      this.userservice.getUser().subscribe(result=>{
        let users:Usercollection[]=result;
        for(let i in users){
          if(user?.email==users[i].email){
            this.currentuser=users[i];
          }
        }
      });
    });
    let evid:string=this.active.snapshot.params['evid'];
    this.eventservice.getEvent().subscribe(result=>{
      let eventc: Eventcollection[]=result;
      for(let i in eventc){
        if(evid==eventc[i].id){
          this.currentevent=eventc[i];
        }
      }
    });
    
    for(let i in this.currentevent.times){
      console.log(this.currentevent.times[i].day);
      const day = new Date(this.currentevent.times[i].day);
      this.currentevent.times[i].day;
    }
}

  addTime(){
    let email: string=this.currentuser?.email;
    let username = this.currentuser?.username;
    console.log(this.day, this.time1, this.time2, this.currentuser?.email, this.currentuser?.username)
    if(this.time1==0){
      alert("Pick a time!");
      return;
    }
    for(let i in this.currentevent.times){
    }
    this.eventservice.updateEventTime(this.currentevent, email, username, [this.time1, this.time2], this.day);
  }

  currentuser:Usercollection={email:'', username:'', groups:[]};
  minDate:Date=new Date();
  currentevent:Eventcollection={ times: [], desc: '', group: '', owner: {email: '', username: ''}, title: '', id: ''};
  day:Date=new Date();
  time1:number=0;
  time2:number=0;

  convertTimestampToDate(timestamp: any): Date {
    const seconds = timestamp.seconds;
    const milliseconds = seconds * 1000;
    return new Date(milliseconds);
  }
}
