import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _router: Router) {

  }
  
  // Guards to disallow customer to access admin services
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = localStorage.getItem('myToken');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);

    if (token) {
      let role = decodedToken.admin;

      if (role == "admin") {    //if admin then allow access
        return true;
      } else {
        this._router.navigate(['/UNAUTHORIZED']);   // if not admin disallow access and redirect to unauthorized page
        return false;
      }
    } else {
      this._router.navigate(['/login']);    //if not logged in then redirect to login page
      return false;
    }
  }

}
