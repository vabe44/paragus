import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutfitPage } from './outfit';

@NgModule({
  declarations: [
    OutfitPage,
  ],
  imports: [
    IonicPageModule.forChild(OutfitPage),
  ],
})
export class OutfitPageModule {}
