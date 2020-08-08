import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user' ;
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private _authServ : AuthService, private router: Router) {
    let token = localStorage.getItem('myToken');
    
   // Register formControlls to mention the required fields and the correct input format 
    let formControls = {
      prenom: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z][^0-9#&<>\"~;$^%{}?]{1,20}$')
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z][^0-9#&<>\"~;$^%{}?]{1,20}$')
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      repassword: new FormControl('', [
        Validators.required,
      ]),

    }

    this.registerForm = fb.group(formControls); //initialize register form with those form controlls
  }

  get prenom() { return this.registerForm.get('prenom'); }  //get prenom from component form
  get name() { return this.registerForm.get('name'); }  //get name from component form

  get address() { return this.registerForm.get('address'); } //get address from component form
  
  get email() { return this.registerForm.get('email'); }  //get email from component form
  get password() { return this.registerForm.get('password'); }  //get password field from component form
  get repassword() { return this.registerForm.get('repassword'); }  //get repassword field from component field


  ngOnInit(): void {
  }

  //funtion to call register web service 
  register() {
    console.log(this.registerForm.value);
    let data = this.registerForm.value;
    let user=new User(data.name,data.prenom,data.password,data.email);
    this._authServ.register(user).subscribe(
      (result)=>{
        console.log(result);
      this.router.navigate(['/']);  //if register succeeded redirect to home products page
        
      },
      (error)=>{
        console.log(error);   //else print error in the console
        
      }
    );
    
  }
}
