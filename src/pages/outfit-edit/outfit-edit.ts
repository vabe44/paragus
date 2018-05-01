import { WardrobeService } from './../../services/wardrobe.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IOutfit } from '../../interfaces/Outfit';

@IonicPage()
@Component({
  selector: 'page-outfit-edit',
  templateUrl: 'outfit-edit.html',
})
export class OutfitEditPage {
  outfit: IOutfit;

  constructor(public navCtrl: NavController, public navParams: NavParams, private wardrobeService: WardrobeService) {
  }

  ngOnInit() {
    this.outfit = this.navParams.data;
  }

  updateOutfit() {
    this.wardrobeService.updateOutfit(this.outfit).subscribe(response => {
      console.log(response);
    });
  }
}
