import { LandingPage } from './../landing/landing';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, private authService: AuthService) {
  }

  onLogout() {
    this.authService.logout();
    this.navCtrl.setRoot(LandingPage);
    this.navCtrl.popToRoot();
  }
}
