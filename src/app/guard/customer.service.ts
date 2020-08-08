import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  constructor(private _router: Router) {

  }

  // Guards to disallow admin to access customer services
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = localStorage.getItem('myToken');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);

    if (token) {
      let role = decodedToken.admin;

      if (role == "user") {
        return true;    //customer authorized
      } else {
        this._router.navigate(['/UNAUTHORIZED']);   // Admin not authorized to access to that customer content
        return false;
      }
    } else {
      this._router.navigate(['/login']);    // if not already connected go to login
      return false;
    }
  }

}
