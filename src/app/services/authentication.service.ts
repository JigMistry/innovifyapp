import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject'

@Injectable()
export class AuthenticationService {

  public token: string;
  signinSubject = new Subject();

  constructor(private http: HttpClient){}


  isAuthenticated():boolean{
    let token = JSON.parse(localStorage.getItem('currentUser')) && JSON.parse(localStorage.getItem('currentUser')).token;
    if(token){
      return true;
    }else{
      return false;
    }
  }

  signin(email: string, password: string): Observable<boolean>{
    return this.http.post('/api/authenticate',JSON.stringify({email: email, password: password}))
      .map((response)=>{
        let token = response['token'];
        if(token){
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({user: email, token: token}));
          this.signinSubject.next();
          return true;
        }else{
          return false;
        }
      });
  }

}
