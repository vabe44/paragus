import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import config from '../config/config';
import { Events } from 'ionic-angular';

@Injectable()
export class AuthService {
  currentUser: any;

  constructor(private http: Http, public events: Events) {
    const token = localStorage.getItem('token');
    if (token) {
      const jwt = new JwtHelper();
      this.currentUser = jwt.decodeToken(token);
    }
  }

  login(credentials) {
   return this.http.post(config.serverApiUrl + '/login', credentials)
    .map(response => {
      const result = response.json();

      if (result && result.token) {
        localStorage.setItem('token', result.token);

        const jwt = new JwtHelper();
        this.currentUser = jwt.decodeToken(localStorage.getItem('token'));
        return true;
      }
      return false;
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
    this.events.publish('user:logout', this.currentUser, Date.now());
  }

  isLoggedIn() {
    return tokenNotExpired('token');
  }

  register(credentials) {
    return this.http.post(config.serverApiUrl + '/register', credentials)
     .map(response => {
       const result = response.json();

       if (result && result.token) {
         localStorage.setItem('token', result.token);

         const jwt = new JwtHelper();
         this.currentUser = jwt.decodeToken(localStorage.getItem('token'));
         return true;
       }
       return false;
     });
   }
}
