import { IOutfit } from '../../interfaces/Outfit';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-business-casual-male-svg',
  templateUrl: 'business-casual-male-svg.component.html',
})
export class BusinessCasualMaleSvgComponent {
  @Input() outfit: IOutfit;
}
