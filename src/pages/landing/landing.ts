import { SignupPage } from './../signup/signup';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  signupPage = SignupPage;
  loginPage = LoginPage;

  constructor(public navCtrl: NavController) {
  }

  onLoad(page: any) {
    this.navCtrl.push(page);
  }

}
