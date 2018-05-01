import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  invalidLogin: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) { }

  signIn(credentials) {
    this.authService.login(credentials)
      .subscribe(result => {
        console.log(result);
        if (result) {
          console.log(result);
        } else  {
          this.invalidLogin = true;
        }
      });
  }

  hideError(): void {
    this.invalidLogin = false;
  }

}
