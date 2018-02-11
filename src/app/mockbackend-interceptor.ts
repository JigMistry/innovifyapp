import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { User } from './model/user.model';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpResponse<{}>> {

    //getting all users stored at localStorage
    let users: User[] = JSON.parse(localStorage.getItem('users')) || [];

    //register user api
    if(req.url === '/api/users' && req.method === 'POST'){
      let newUser = req.body;
      let duplicateUser = users.filter(user => { return user.email === newUser.email; }).length;
      if (duplicateUser) {
          return Observable.throw('Username "' + newUser.email + '" is already taken');
      }
      users.push(newUser);
      localStorage.setItem('users',JSON.stringify(users));
      return Observable.of(new HttpResponse({status: 200}));
    }

    //sign-in user api
    if(req.url === '/api/authenticate' && req.method === 'POST'){
      let requestBody = JSON.parse(req.body);
      let filteredUsers = users.filter(user => {
        return user.email === requestBody.email && user.password === requestBody.password;
      });

      if(filteredUsers.length){
        let user = filteredUsers[0];
        return Observable.of(new HttpResponse({status: 200, body: { token: 'jwt-token' }}));
      }
      else{
        return Observable.throw('Username or Password is incorrect');
      }

    }
    //api to get logged in user information
    if(req.url === '/api/user' && req.method === 'GET'){
      if(req.headers.get('authorization') === 'Bearer jwt-token'){
          let user = users.find((user)=>{
            return user.email === req.params.get('email')
          });
          return Observable.of(new HttpResponse({status: 200, body: user}));
      }else{
        Observable.throw('Something Bad Happened');
      }

    }

    const modifiedRequest = req.clone();
    return next.handle(modifiedRequest);
  }
}
