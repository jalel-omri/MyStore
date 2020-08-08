import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit {
  // 404 page when the url requested is not found and rediirect to home page
  constructor( private _as: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  backClicked() {
    let token = localStorage.getItem('myToken');
    if (token) {
      if (1) {
        this.router.navigate(['/produits'])
      } else  {
        const helper = new JwtHelperService();
        const studentId = helper.decodeToken(token).studentId;
        this.router.navigate(['/produits'])
      }
    }
  }

}
