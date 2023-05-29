import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { UsersService } from 'src/app/shared/users.service';
import { Usercollection } from 'src/models/usercollection';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private auth : AuthService, private userservice: UsersService) {}

  ngOnInit(): void{
    this.userservice.getUser().subscribe(result =>{
      this.usercollection=result;
    });
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  usercollection: Usercollection[] = [];
  currentuser: Usercollection | null = null;
  userinput: string = "";
  passwordinput: string ="";

  login(){
    if(this.userinput == ''){
      alert('Email Box is Empty.');
      return;
    }
    if(this.passwordinput == ''){
      alert('Password Box is Empty.');
      return;
    }
    for(let i in this.usercollection){
      if(this.usercollection[i].email==this.userinput){
        this.currentuser=this.usercollection[i];
        localStorage.setItem('username', this.currentuser.username);
        localStorage.setItem('id', this.currentuser.email);
      }
    }
    this.auth.login(this.userinput.trim(), this.passwordinput.trim());
    this.userinput = '';
    this.passwordinput = '';
  }

}
