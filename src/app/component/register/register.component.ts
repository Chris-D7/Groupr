import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { UsersService } from 'src/app/shared/users.service';
import { Usercollection } from 'src/models/usercollection';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(private auth : AuthService, private userservice: UsersService, private router: Router) {}

  ngOnInit(): void {
    
  }

  userinput: string = "";
  usernameinput: string = "";
  passwordinput: string = "";
  am: string[]=[];

  register(){
    let reg: boolean=false;
    if(this.userinput == ''){
      alert('Email Box is Empty.');
      return;
    }
    if(this.passwordinput == ''){
      alert('Password Box is Empty.');
      return;
    }
    this.auth.register(this.userinput, this.passwordinput, this.usernameinput);
    this.userinput = '';
    this.passwordinput = '';
    this.usernameinput= '';
    this.router.navigate(['/Login']);
  }
}