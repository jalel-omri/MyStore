import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private _authService:AuthService,private router:Router) {
    let formControls = {
      Email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      Password: new FormControl('',[
        Validators.required,
        Validators.minLength(8)
      ])
    }

    this.loginForm = fb.group(formControls);
  }

  get Email(){return this.loginForm.get('Email');}
  get Password(){return this.loginForm.get('Password');}


  ngOnInit(): void {
  }

  login(){
    console.log(this.loginForm.value);
    let data = this.loginForm.value;

    let user = new User

    this._authService.login(data).subscribe(
      (result)=>{
        console.log(result);
        let token = result.token ;
        localStorage.setItem('myToken',token);
        const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
  
      if (decodedToken.admin == "admin") {
        this.router.navigate(['/produits']);
      }else {
         var nbr=0;
        localStorage.setItem("qte",JSON.stringify(nbr));
        let achats=[];
        let achat =JSON.stringify(achats);
    localStorage.setItem("achats",achat);
        this.router.navigate(['/produits']);
      }
        
       
    
 
        
      },
      (error)=>{
        console.log(error);
      }
    );
    
  }

}
