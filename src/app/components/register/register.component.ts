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

    this.registerForm = fb.group(formControls);
  }

  get prenom() { return this.registerForm.get('prenom'); }
  get name() { return this.registerForm.get('name'); }

  get address() { return this.registerForm.get('address'); }
  
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get repassword() { return this.registerForm.get('repassword'); }


  ngOnInit(): void {
  }

  register() {
    console.log(this.registerForm.value);
    let data = this.registerForm.value;
    let user=new User(data.name,data.prenom,data.password,data.email);
    this._authServ.register(user).subscribe(
      (result)=>{
        console.log(result);
      this.router.navigate(['/']);
        
      },
      (error)=>{
        console.log(error);
        
      }
    );
    
  }
}
