import { IOutfit } from './../../interfaces/Outfit';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-outfit',
  templateUrl: 'outfit.html',
})
export class OutfitPage implements OnInit {
  outfit: IOutfit;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.outfit = this.navParams.data;
  }

}
