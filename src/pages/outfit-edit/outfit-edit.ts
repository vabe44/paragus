import { WardrobeService } from './../../services/wardrobe.service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { IOutfit } from '../../interfaces/Outfit';

@Component({
  selector: 'page-outfit-edit',
  templateUrl: 'outfit-edit.html',
})
export class OutfitEditPage implements OnInit {
  outfit: IOutfit;
  tempOutfit: IOutfit;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private wardrobeService: WardrobeService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.outfit = this.navParams.data;
    this.tempOutfit = {...this.outfit};
  }

  updateOutfit() {
    const loading = this.loadingCtrl.create({
      content: 'Updating outfit...'
    });
    loading.present();
    this.wardrobeService.updateOutfit(this.tempOutfit).subscribe(response => {
      console.log(response);
      if (response.updated) {
        loading.dismiss();
        this.outfit = response.outfit;
        this.navCtrl.popToRoot();
      } else {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Failed to update outfit. Please try again!',
          message: response.message,
          buttons: ['Ok']
        });
        alert.present();
      }
    });
  }

  deleteOutfit() {
    let confirm = this.alertCtrl.create({
      title: 'Delete outfit?',
      message: 'Are you sure you want to delete this outfit?',
      buttons: [
        {
          text: 'No',
          handler: () => ({})
        },
        {
          text: 'Yes',
          handler: () => {

            const loading = this.loadingCtrl.create({
              content: 'Deleting outfit...'
            });
            loading.present();

            this.wardrobeService.deleteOutfit(this.outfit)
            .subscribe(response => {
              if (response.deleted) {
                loading.dismiss();
                this.navCtrl.popToRoot();
              } else {
                loading.dismiss();
                const alert = this.alertCtrl.create({
                  title: 'Failed to delete outfit. Please try again!',
                  message: response.message,
                  buttons: ['Ok']
                });
                alert.present();
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
