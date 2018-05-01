import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';
import config from '../config/config';

@Injectable()
export class ClothesService {
  private skinTonesUrl = config.serverApiUrl + '/skin-tones';
  private shirtColorsUrl = config.serverApiUrl + '/shirt-colors';
  private pantsColorsUrl = config.serverApiUrl + '/pants-colors';
  private shoeColorsUrl = config.serverApiUrl + '/shoe-colors';
  private skinShirtUrls = config.serverApiUrl + '/skin-shirts';
  private shirtPantsUrls = config.serverApiUrl + '/shirt-pants';
  private pantsShoesUrls = config.serverApiUrl + '/pants-shoes';

  constructor(private http: Http) { }

  getAll() {
    const skinTones = this.getSkinTones().map(res => res.json());
    const shirtColors = this.getShirtColors().map(res => res.json());
    const pantsColors = this.getPantsColors().map(res => res.json());
    const shoeColors = this.getShoeColors().map(res => res.json());
    const skinShirts = this.getSkinShirts().map(res => res.json());
    const shirtPants = this.getShirtPants().map(res => res.json());
    const pantsShoes = this.getPantsShoes().map(res => res.json());
    return Observable.forkJoin([skinTones, shirtColors, pantsColors, shoeColors, skinShirts, shirtPants, pantsShoes]);
  }

  getSkinTones() {
    return this.http.get(this.skinTonesUrl);
  }

  getShirtColors() {
    return this.http.get(this.shirtColorsUrl);
  }

  getPantsColors() {
    return this.http.get(this.pantsColorsUrl);
  }

  getShoeColors() {
    return this.http.get(this.shoeColorsUrl);
  }

  getSkinShirts() {
    return this.http.get(this.skinShirtUrls);
  }

  getShirtPants() {
    return this.http.get(this.shirtPantsUrls);
  }

  getPantsShoes() {
    return this.http.get(this.pantsShoesUrls);
  }

}
