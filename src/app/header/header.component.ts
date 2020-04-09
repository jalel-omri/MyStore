import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(private router:Router ) { }

  ngOnInit(): void {
    
    
  }

  logout(){
    localStorage.removeItem("myToken");
    this.router.navigate(['/login']);
  }

}
