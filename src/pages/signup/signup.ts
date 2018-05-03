import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  signUp(credentials) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();
    this.authService.register(credentials)
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
            title: 'Signup failed!',
            message: error.message,
            buttons: ['Ok']
          });
          alert.present();
        }
      );
  }

}
