import { SignupPage } from './../signup/signup';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  signupPage = SignupPage;
  loginPage = LoginPage;

  constructor(public navCtrl: NavController) {
  }

  onLoad(page: any) {
    this.navCtrl.push(page);
  }
}
