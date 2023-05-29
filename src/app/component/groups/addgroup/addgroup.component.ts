import { Component, OnInit } from '@angular/core';
import { Firestore, collection, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GroupsService } from 'src/app/shared/groups.service';
import { UsersService } from 'src/app/shared/users.service';
import { Groupscollection } from 'src/models/groupscollection';
import { Usercollection } from 'src/models/usercollection';

@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.component.html',
  styleUrls: ['./addgroup.component.css']
})
export class AddgroupComponent implements OnInit{

  constructor(private groupservice: GroupsService, private router: Router, private userservice: UsersService, private firestore: Firestore){}

  ngOnInit(): void {
    this.groupservice.getGroup().subscribe(result =>{
      this.groupscollection=result;});
    this.userservice.getUser().subscribe(result =>{
      let users:Usercollection[] = result;
      for(let i in users){
        if(users[i].email==localStorage.getItem('id')){
          this.currentuser=users[i];
        }
      }
    })
  }

  currentuser: Usercollection|null = null;
  groupname: string = "";
  groupid: string = "";
  groupscollection: Groupscollection[] = [];

  async addGroup(){
    if(this.groupname == ''){
      alert('Group Name is Empty.');
      return;
    }
    if(this.groupid == ''){
      alert('Group ID is Empty.');
      return;
    }
      for(let i in this.groupscollection){
        if(this.groupscollection[i].id==this.groupid){
          alert('Group ID is Taken.');
          return;
        }
      }
    let newgroup={ id: this.groupid, owner: localStorage.getItem('id')?.trim() as string, name:this.groupname, participants: [localStorage.getItem('id')?.trim()] as string[], events:[]};
    this.groupservice.addGroup(newgroup);
    const myCollection = collection(this.firestore, 'Users');
    this.currentuser?.groups.push(this.groupid);
    this.userservice.updateUser(this.currentuser as Usercollection);
    this.router.navigate(['/Groups']);
  }
}
