import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../model/user.model';
import { UserService } from '../users.service';


@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css']
})
export class SignupComponent{

  signupForm: FormGroup;
  fileData = null;
  fileType = null;

  constructor(private router: Router, private userService: UserService){
    this.createSignupForm();
  }

 createSignupForm(){
   this.signupForm = new FormGroup({
     first_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
     last_name: new FormControl('', [Validators.minLength(2), Validators.maxLength(30)]),
     surname: new FormControl('', [Validators.minLength(2), Validators.maxLength(30)]),
     mobile_no : new FormControl(''),
     email: new FormControl('',Validators.email),
     password: new FormControl('',[Validators.required, Validators.minLength(5)]),
     dob: new FormControl(''),
     profileImage : new FormControl()
   });
 }

 getFile(event) {
  let reader = new FileReader();
  if(event.target.files && event.target.files.length > 0) {
    let file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileType = file.type;
      this.fileData = reader.result.split(',')[1];
    };
  }
}

  onSubmit(){
    let first_name = this.signupForm.value.first_name;
    let last_name = this.signupForm.value.last_name;
    let surname = this.signupForm.value.surname;
    let mobile_no = this.signupForm.value.mobile_no;
    let email = this.signupForm.value.email;
    let password = this.signupForm.value.password;
    let dob = this.signupForm.value.dob;
    let profileImage = {
      fileData: this.fileData,
      fileType: this.fileType
    }
    this.userService.doSignup(new User(first_name, last_name, surname, mobile_no, email, password, dob, profileImage)).
      subscribe(()=>{
        this.router.navigate(['/signin']);
      });
  }

}
