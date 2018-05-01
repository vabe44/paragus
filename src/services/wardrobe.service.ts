import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import config from '../config/config';

@Injectable()
export class WardrobeService {

  constructor(private authHttp: AuthHttp) {
  }

  getOutfits() {
    return this.authHttp.get(config.serverApiUrl + '/api/wardrobe')
      .map(response => response.json());
  }

  getOutfit(id) {
    return this.authHttp.get(config.serverApiUrl + '/api/wardrobe/' + id)
      .map(response => response.json());
  }

  updateOutfit(outfit) {
    return this.authHttp.put(config.serverApiUrl + '/api/wardrobe', outfit)
      .map(response => response.json());
  }

  saveOutfit(outfit) {
    return this.authHttp.post(config.serverApiUrl + '/api/wardrobe', outfit)
      .map(response => response.json());
  }

  deleteOutfit(outfit) {
    console.log('deleting outfit: ', outfit);
    return this.authHttp.delete(config.serverApiUrl + '/api/wardrobe/' + outfit.id)
      .map(response => response.json());
  }
}
