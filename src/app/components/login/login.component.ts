import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

// Login component handles the connection of users

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private _authService:AuthService,private router:Router) {
    let formControls = {      //initialize the Form controls to specify the required and correct fomat of inputs 
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

  get Email(){return this.loginForm.get('Email');}  //get email from user inputs
  get Password(){return this.loginForm.get('Password');}  //get password from user inputs


  ngOnInit(): void {
  }

  // Call Login service for authentication 
  login(){
    console.log(this.loginForm.value);
    let data = this.loginForm.value;

    
    this._authService.login(data).subscribe(
      (result)=>{
        console.log(result);
        let token = result.token ;
        localStorage.setItem('myToken',token);
        const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
  
      if (decodedToken.admin == "admin") {  //if admin redirect to manage products list
        this.router.navigate(['/produits']);
      }else {               // if customer redirect to all products list and initialize the necessary values( nbr of products,the list of products  to be commanded )
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
