import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // the Header of my application
  constructor(private router:Router ) { }
  token=false;    //initialize the token to null
  ngOnInit(): void {
    //extract the token when found in the local storage
    let token=localStorage.getItem("myToken");
    if(token){
      this.token=true;
    }
    
  }
  //Logout function and delete of all attributes related to the current user
  logout(){
    localStorage.removeItem("myToken");
    localStorage.removeItem("qte");
    localStorage.removeItem("achats");
    this.router.navigate(['/login']);
  }

}
