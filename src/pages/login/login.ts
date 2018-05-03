import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  invalidLogin: boolean;
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
          } else {
            this.invalidLogin = true;
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

  hideError(): void {
    this.invalidLogin = false;
  }

}
