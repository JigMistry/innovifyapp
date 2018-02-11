import { Component, OnInit } from '@angular/core';

import { UserService } from '../users.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  user: {} = null;

  constructor(private userService: UserService){}

  ngOnInit(){
    this.userService.getUserInfo().subscribe((response)=>{
      this.user = {
        first_name: response['first_name'] ,
        last_name: response['last_name'] || 'NOT AVAILABLE',
        surname: response['surname'] || 'not available',
        mobile_no: response['mobile_no'] || 'NOT AVAILABLE',
        email: response['email'],
        dob: response['dob'] || 'NOT AVAILABLE',
        profileImage: response['profileImage']
      }

    });
  }


}
