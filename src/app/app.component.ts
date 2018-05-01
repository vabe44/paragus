import { LandingPage } from './../pages/landing/landing';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
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
  isAuthenticated = false;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private authService: AuthService,
    public events: Events) {
      events.subscribe('user:logout', (user, time) => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        console.log('Bye', user, 'at', time);
        this.isAuthenticated = false;
        this.rootPage = LandingPage;
      });
      if (this.authService.isLoggedIn()) {
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = LandingPage;
      }
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
      });
  }
}
