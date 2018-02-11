import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from './model/user.model';


@Injectable()
export class UserService{

  constructor(private httpClient: HttpClient){}

  // sign up api call
  doSignup(newUser: User): Observable<any>{
    return this.httpClient.post('/api/users',newUser);
  }
  // api call to get logged in user information
  getUserInfo():Observable<Object>{
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    let header = new HttpHeaders();
    let modified_header = header.append('Authorization',`Bearer ${currentUser.token}`);
    let params = new HttpParams().set('email',currentUser.user);
    return this.httpClient.get('/api/user',{headers: modified_header, params: params})
      .map((response)=>{
        console.log(typeof response);
        return response;
    });
  }

}
