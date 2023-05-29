import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { UsersService } from 'src/app/shared/users.service';
import { Usercollection } from 'src/models/usercollection';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  constructor(private authservice: AuthService, private auth: AngularFireAuth, private userservice: UsersService, private router:Router){}
  ngOnInit(): void {
    this.auth.onAuthStateChanged((user)=>{
      if(user){
        this.userservice.getUser().subscribe(result=>{
          let users:Usercollection[]=result;
          for(let i in users){
            if(user.email==users[i].email){
              this.username=users[i].username;
            }
          }
        })
      }
      else this.router.navigate(['/Login']);
    });
  }

  username:string='';

  LogOut(){
    this.authservice.logout();
  }
}
