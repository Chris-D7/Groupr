import { Component, OnInit } from '@angular/core';
import { Groupscollection } from 'src/models/groupscollection';
import { Usercollection } from 'src/models/usercollection';
import { GroupsService } from 'src/app/shared/groups.service';
import { UsersService } from 'src/app/shared/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit{

  constructor(private groupservice: GroupsService, private userservice: UsersService, private router: Router){}

  currentuser: Usercollection|null=null; 
  currentgroups: Groupscollection[] = [];
  groupids: string[]=[];
  modal: boolean = true;

  ngOnInit(): void {
    let usercollection: Usercollection[]=[];
    this.userservice.getUser().subscribe(result =>{
      usercollection=result;
      let id: string=localStorage.getItem('id') as string;
      for(let i in usercollection){
        if(usercollection[i].email==id){
          this.currentuser=usercollection[i];
        }
      }
    });
    let groupscollection: Groupscollection[] = [];
    this.groupservice.getGroup().subscribe(result =>{
      groupscollection=result;
      let groupids: string[] = this.currentuser?.groups as string[];
      this.currentgroups=[];
      for(let i in groupids){
        for(let k in groupscollection){
          if (groupids[i]==groupscollection[k].id){
            this.currentgroups.push(groupscollection[k]);
          }
        }
      }
    });
  }

  switch(){
    this.router.navigate(['/Add Group'])
  }
}
