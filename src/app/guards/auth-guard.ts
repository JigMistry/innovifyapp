import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private router: Router){}
  canActivate(){
    let token = JSON.parse(localStorage.getItem('currentUser')) && JSON.parse(localStorage.getItem('currentUser')).token;
    if(token) {
      return true;
    }
    this.router.navigate(['/signin']);
    return false;
  }
}
