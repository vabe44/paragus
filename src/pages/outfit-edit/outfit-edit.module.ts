import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutfitEditPage } from './outfit-edit';

@NgModule({
  declarations: [
    OutfitEditPage,
  ],
  imports: [
    IonicPageModule.forChild(OutfitEditPage),
  ],
})
export class OutfitEditPageModule {}
