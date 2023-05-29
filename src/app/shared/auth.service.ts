import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { Usercollection } from 'src/models/usercollection';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router, private userservice: UsersService) { }

  isAuth: boolean = false;

  login(email: string, password: string){
    this.fireauth.signInWithEmailAndPassword(email, password).then( () => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/Home']);
    }, err => {
      alert('Something Went Wrong');
      this.router.navigate(['/Login']);
    })
  }

  register(email:string, password:string, username:string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then( ()=> {
      let newuser:Usercollection={email: email, username: username, groups:[]};
      this.userservice.addUser(newuser);
      alert('Registration Successful');
    })
    .catch(function(error){
      var errcode=error.code;
      var errorMessage=error.message;
      alert(errorMessage);
    });
  }

  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.setItem('token', 'false');
      localStorage.removeItem('id');
      this.router.navigate(['/Login'])
    }, err => {
      alert(err.message);
    })
  }

  isloggedin(){
    return !!localStorage.getItem('token');
  }
}
