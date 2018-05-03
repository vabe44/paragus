import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, private authService: AuthService) {
  }

  onLogout() {
    this.authService.logout();
  }
}
