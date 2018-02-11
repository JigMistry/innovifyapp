import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit{

  title: string = 'Header';
  isAuthenticated: boolean ;

  constructor(private router: Router, private authenticationService: AuthenticationService ){}



  ngOnInit(){
    this.isAuthenticated = this.authenticationService.isAuthenticated();
    this.authenticationService.signinSubject.subscribe(_=>{
      this.isAuthenticated = this.authenticationService.isAuthenticated();
    });
  }

  onSignout(){
    localStorage.setItem('currentUser',null);
    this.isAuthenticated = this.authenticationService.isAuthenticated();
    this.router.navigate(['/signin']);
  }
}
