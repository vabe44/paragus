import { WardrobeService } from './../../services/wardrobe.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-wardrobe',
  templateUrl: 'wardrobe.html',
})
export class WardrobePage implements OnInit {
  outfits: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private wardrobeService: WardrobeService) {
  }

  ngOnInit() {
    this.wardrobeService.getOutfits()
      .subscribe(outfits => this.outfits = outfits);
  }

}
