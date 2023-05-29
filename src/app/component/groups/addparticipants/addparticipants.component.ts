import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService } from 'src/app/shared/groups.service';
import { UsersService } from 'src/app/shared/users.service';
import { Groupscollection } from 'src/models/groupscollection';
import { Usercollection } from 'src/models/usercollection';

@Component({
  selector: 'app-addparticipants',
  templateUrl: './addparticipants.component.html',
  styleUrls: ['./addparticipants.component.css']
})
export class AddparticipantsComponent implements OnInit{

  constructor(private active: ActivatedRoute, private groupservice: GroupsService, private router: Router, private userservice: UsersService, private firestore: Firestore){}

  ngOnInit(){
    let id:string=this.active.snapshot.params['id'];
    let groupscollection: Groupscollection[] = [];
    this.groupservice.getGroup().subscribe(result =>{
      groupscollection=result;
      for(let k in groupscollection){
        if (id==groupscollection[k].id){
          this.activegroup=groupscollection[k];
        }
      }
    });
    this.userservice.getUser().subscribe(result => {
      this.usercollection=result; 
    });
  }

  usercollection: Usercollection[]=[];
  activegroup: Groupscollection|null=null;
  email:string="";

  async addParticipant(){
    if(this.email == ''){
      alert('Email is Empty.');
      return;
    }
    let currentuser:Usercollection = {username: "", email: "", groups:[]};
    for(let i in this.usercollection){
      if(this.usercollection[i].email==this.email){
        currentuser=this.usercollection[i];
      }
    }
    let ok:boolean=true;
    this.activegroup?.participants.forEach(x=>{
      if(this.email==x){
        ok=false;
        alert('User already in group.')
        return;
      }
    })
    if(currentuser.username==""){
      alert('No such user was found.');
      return;
    }
    else if(ok){
    currentuser?.groups.push(this.activegroup?.id as string);
    await this.userservice.updateUser(currentuser as Usercollection);
    this.activegroup?.participants.push(currentuser?.email as string);
    await this.groupservice.updateGroup(this.activegroup as Groupscollection);
    this.router.navigate(['/Groups/'+this.active.snapshot.params['id']]);
    }
  }
}
