import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from "rxjs/Subscription";
import { Subject } from 'rxjs/Subject';
import { UserService } from '../users.service';
import { AuthenticationService } from '../services/authentication.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-signin',
  templateUrl: 'signin.component.html',
    styleUrls: ['signin.component.css']

})

export class SigninComponent implements OnDestroy{

  signinSubscription = new Subscription();
  signinForm: FormGroup;

  constructor(
      private authenticationService: AuthenticationService,
      private router: Router,
      private appComponent: AppComponent
  )
  {
        this.createSigninForm();
  }

  createSigninForm(){
    this.signinForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('',Validators.required)
    });
  }

  onSubmit(){
    let email = this.signinForm.value.email;
    let password = this.signinForm.value.password;

    this.signinSubscription = this.authenticationService.signin(email, password)
    .subscribe((result)=>{
        if(result){
          this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy(){
    this.signinSubscription.unsubscribe();
  }

}
