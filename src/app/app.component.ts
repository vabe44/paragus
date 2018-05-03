import { LandingPage } from './../pages/landing/landing';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LandingPage;
  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private authService: AuthService,
    public events: Events) {
      if (this.authService.isLoggedIn()) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LandingPage;
      }
      events.subscribe('user:logout', (user, time) => {
        this.rootPage = LandingPage;
        this.nav.setRoot(LandingPage);
      });
      platform.ready().then(() => {
        statusBar.styleDefault();
        splashScreen.hide();
      });
  }
}

