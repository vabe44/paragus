import { WardrobePage } from './../wardrobe/wardrobe';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  isLoggedIn = false;
  tab1Root = HomePage;
  tab2Root = WardrobePage;
  tab3Root = ContactPage;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
