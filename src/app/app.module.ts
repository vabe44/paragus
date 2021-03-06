import { OutfitEditPage } from './../pages/outfit-edit/outfit-edit';
import { ClothesService } from './../services/clothes.service';
import { WardrobeService } from './../services/wardrobe.service';
import { WardrobePage } from './../pages/wardrobe/wardrobe';
import { AuthService } from './../services/auth.service';
import { BusinessCasualMaleSvgComponent } from './../components/business-casual-male-svg/business-casual-male-svg.component';
import { SignupPage } from './../pages/signup/signup';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AuthHttp, AuthConfig } from 'angular2-jwt/angular2-jwt';
import { BrowserXhr, RequestOptions } from '@angular/http';
import { HttpModule, Http } from '@angular/http';
import { CustExtBrowserXhr } from '../cust-ext-browser-xhr';

import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { LandingPage } from '../pages/landing/landing';
import { OutfitPage } from '../pages/outfit/outfit';

export function getAuthHttp(http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token'
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    LandingPage,
    WardrobePage,
    OutfitPage,
    OutfitEditPage,
    BusinessCasualMaleSvgComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    LandingPage,
    WardrobePage,
    OutfitPage,
    OutfitEditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    AuthHttp,
    WardrobeService,
    ClothesService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http, RequestOptions]
    },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // CORS
    {provide: BrowserXhr, useClass: CustExtBrowserXhr},
  ]
})
export class AppModule {}
