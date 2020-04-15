import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginUrl = "https://my4storeapi.herokuapp.com/login";
  private _registerUrl="https://my4storeapi.herokuapp.com/register";
  

  constructor(private http: HttpClient, private router: Router) { }

  login(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  register(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  

  isLoggedIn(){
    let token = localStorage.getItem('myToken');
    if (!token) {
      return false;
    }else{
      return true;
    }
  }

  isStudent(){
    let token = localStorage.getItem('myToken');
    if (!token) {
      return false;
    }else {

      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
  
      if (decodedToken.role == "student") {
        return true;
      }else {
        return false
      }
    }
  }

  isAdmin(){
    let token = localStorage.getItem('myToken');
    if (!token) {
      return false;
    }else {
      //isLoggedIn , isStudent
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
  
      if (decodedToken.role == "admin") {
        return true;
      }else {
        return false
      }
    }
  }
}
