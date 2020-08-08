import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // url des web services d'authentification
  private _loginUrl = "https://my4storeapi.herokuapp.com/login";
  private _registerUrl="https://my4storeapi.herokuapp.com/register";
  

  constructor(private http: HttpClient, private router: Router) { }
  
  // login function 
  login(user) {
    return this.http.post<any>(this._loginUrl, user);
  }
  // register function
  register(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  
  // function to check Logged in status
  isLoggedIn(){
    let token = localStorage.getItem('myToken');
    if (!token) {
      return false;
    }else{
      return true;
    }
  }

}
