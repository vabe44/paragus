import { WardrobePage } from './../wardrobe/wardrobe';
import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  isLoggedIn = false;
  tab1Root = HomePage;
  tab2Root = WardrobePage;
  tab3Root = SettingsPage;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
