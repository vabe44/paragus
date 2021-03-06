import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  signIn(credentials) {
    const loading = this.loadingCtrl.create({
      content: 'Logging in...'
    });
    loading.present();
    this.authService.login(credentials)
      .subscribe(
        result => {
          if (result) {
            this.navCtrl.setRoot(TabsPage);
            this.navCtrl.popToRoot();
          }
          loading.dismiss();
        },
        error => {
          loading.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Signin failed!',
            message: error.message,
            buttons: ['Ok']
          });
          alert.present();
        }
      );
  }
}
