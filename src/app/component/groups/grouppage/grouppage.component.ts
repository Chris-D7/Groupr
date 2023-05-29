import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DocumentSnapshot, Firestore, addDoc, collection } from '@angular/fire/firestore';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EventService } from 'src/app/shared/event.service';
import { GroupsService } from 'src/app/shared/groups.service';
import { UsersService } from 'src/app/shared/users.service';
import { Eventcollection } from 'src/models/eventcollection';
import { Groupscollection } from 'src/models/groupscollection';
import { Usercollection } from 'src/models/usercollection';

@Component({
  selector: 'app-grouppage',
  templateUrl: './grouppage.component.html',
  styleUrls: ['./grouppage.component.css'],
})
export class GrouppageComponent implements OnInit{

  constructor(private firestore: Firestore, private active: ActivatedRoute, private groupservice: GroupsService, private router: Router, private userservice:UsersService, private eventservice: EventService, private auth: AngularFireAuth){
  }

  activegroup: Groupscollection = {id:'', owner:'', name:'', participants:[], events:[]};
  owner: boolean = false;
  unevent: boolean = false;
  participants:string[]=[];
  email:string='';
  username:string='';
  events: Eventcollection[]=[];
  

  eventTitle: string='';
  eventDesc: string='';
  eventID: string='';
  eventDeadline: Date|null=null;

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user)=>{this.email = user?.email as string});
    let id:string=this.active.snapshot.params['id'];
    let groupscollection: Groupscollection[] = [];
    this.groupservice.getGroup().subscribe(result =>{
      groupscollection=result;
      for(let k in groupscollection){
        if (id==groupscollection[k].id){
          this.activegroup=groupscollection[k];
        }
      }
      if(this.activegroup.id==''){
        if(localStorage.getItem('token')!=null){
          this.router.navigate(['/Groups']);
        }
        else{
          this.router.navigate(['/Login']);
        }
      }
      if(this.activegroup.owner==localStorage.getItem('id')){
        this.owner=true;
      }
      let usercollection: Usercollection[] = [];
      this.userservice.getUser().subscribe(result =>{
        usercollection=result;
        this.participants=[];
        for(let i in usercollection){
          if(usercollection[i].email==this.email){
            this.username=usercollection[i].username;
          }
          for(let k in this.activegroup.participants){
            if(usercollection[i].email==this.activegroup.participants[k]){
              this.participants.push(usercollection[i].username);
            }
          }
        }
      })
    });
    this.eventservice.getEvent().subscribe(result=>{
      let events=result;
      this.events=[];
      for(let i in events){
          if(events[i].group==this.activegroup.id){
            this.events.push(events[i]);
        }
      }
    });
  }

  switch(){
    this.router.navigate(['/Groups/'+this.active.snapshot.params['id']+'/Add Participants']);
  }

  show(){
    this.unevent=!this.unevent;
  }

  async submit(){
    if(this.eventTitle=='' || this.eventID==''){
      alert('Complete the fields.')
      return;
    }
    const evowner = new Map();
    evowner.set(this.email, this.username);
    const ownermap={email: this.email, username:this.username};
    const unevent: Eventcollection = { times: [], desc: this.eventDesc, group: this.activegroup.id, owner: ownermap, title: this.eventTitle, id: this.eventID};
    console.log(unevent.desc, unevent.group, unevent.id, unevent.owner, unevent.times, unevent.title);
    const docRef = await addDoc(collection(this.firestore, "Events"), unevent);
    this.eventTitle='';
    this.eventDesc='';
    this.eventID='';
    this.eventDeadline=new Date();
    this.unevent=!this.unevent;
  }
}