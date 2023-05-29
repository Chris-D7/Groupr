import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EventService } from 'src/app/shared/event.service';
import { UsersService } from 'src/app/shared/users.service';
import { Eventcollection } from 'src/models/eventcollection';
import { Usercollection } from 'src/models/usercollection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private userservice: UsersService, private auth: AngularFireAuth, private eventservice: EventService){}
  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userservice.getUser().subscribe((result) => {
          let users: Usercollection[] = result;
          for (let i in users) {
            if (user.email == users[i].email) {
              this.currentuser = users[i];
            }
          }
  
          let eventcollection: Eventcollection[] = [];
          this.eventservice.getEvent().subscribe((result) => {
            eventcollection = result;
            this.userevents = [];
            this.currentuser?.groups.forEach((x) => {
              for (let j in eventcollection) {
                console.log(x);
                if (x == eventcollection[j].group) {
                  this.userevents.push(eventcollection[j]);
                }
              }
            });
          });
        });
      }
    });
  }

  userevents:Eventcollection[]=[];
  currentuser: Usercollection | null = null;
  usercollection: Usercollection[]=[];
  userinput:string | null='';
  usernameinput:string | null='';
  

  getUsers(){
    this.userservice.getUser().subscribe(result=>{
      this.usercollection = result;
    });
  }

  addUsers(newuser:Usercollection){
    this.userservice.addUser(newuser);
  }
}
