import { AuthService } from './../../services/auth.service';
import { WardrobeService } from './../../services/wardrobe.service';
import { SignupPage } from './../signup/signup';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ClothesService } from '../../services/clothes.service';
import { Outfit } from '../../classes/outfit';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  signupPage = SignupPage;
  loginPage = LoginPage;

  skinTones: any[] = [];
  shirtColors: any[] = [];
  pantsColors: any[] = [];
  shoeColors: any[] = [];
  skinShirts: any[] = [];
  shirtPants: any[] = [];
  pantsShoes: any[] = [];

  currentStep: number;
  currentTask: string;
  currentlyChoosing: string;

  selectedSkinTone: any = false;
  selectedShirtColor: any = false;
  selectedPantsColor: any = false;
  selectedShoeColor: any = false;

  filteredSkinTones: any[] = [];
  filteredShirtColors: any[] = [];
  filteredPantsColors: any[] = [];
  filteredShoeColors: any[] = [];

  outfit: Outfit = {
    id: 0,
    name: '',
    shirt: {
      id: 0,
      color: '',
      colorcode: '#FFF'
    },
    pants: {
      id: 0,
      color: '',
      colorcode: '#FFF'
    },
    shoes: {
      id: 0,
      color: '',
      colorcode: '#FFF'
    }
  };

  constructor(
    public navCtrl: NavController,
    private clothesService: ClothesService,
    private wardrobeService: WardrobeService, 
    public authService: AuthService,
    private alertCtrl: AlertController) {
  }

  onLoad(page: any) {
    this.navCtrl.push(page);
  }

  ngOnInit() {
    this.clothesService.getAll().subscribe(response => {
      this.skinTones = response[0];
      this.shirtColors = response[1];
      this.pantsColors = response[2];
      this.shoeColors = response[3];
      this.skinShirts = response[4];
      this.shirtPants = response[5];
      this.pantsShoes = response[6];

      this.filteredSkinTones = Array.from(response[0]);
      this.filteredShirtColors = Array.from(response[1]);
      this.filteredPantsColors = Array.from(response[2]);
      this.filteredShoeColors = Array.from(response[3]);
    });

    this.currentStep = 1;
    this.currentTask = 'Select one of the clothes to start:';
  }

  checkIfSelected(currentlyChoosing) {

      if (currentlyChoosing === 'shirt' && !this.selectedShirtColor) {
        this.setCurrentlyChoosing(currentlyChoosing);
      }

      if (currentlyChoosing === 'pants' && !this.selectedPantsColor) {
        this.setCurrentlyChoosing(currentlyChoosing);
      }

      if (currentlyChoosing === 'shoes' && !this.selectedShoeColor) {
        this.setCurrentlyChoosing(currentlyChoosing);
      }
  }

  setCurrentlyChoosing(currentlyChoosing) {
    this.currentTask = `Select the color of the ${currentlyChoosing}:`;
    // nothing selected yet!
    if (!this.selectedShirtColor && !this.selectedPantsColor && !this.selectedShoeColor) {
      // 0
      console.log(0);
      this.currentlyChoosing = currentlyChoosing;
      this.currentStep = 2;
    } else if ( currentlyChoosing === 'shirt' && (this.selectedPantsColor && this.selectedShoeColor) )  {
      // 4
      console.log(4);
      this.currentlyChoosing = 'shirt';
      this.currentStep = 4;
    } else if ( currentlyChoosing === 'pants' && (this.selectedShirtColor && this.selectedShoeColor) )  {
      // 5
      console.log(5);
      this.currentlyChoosing = 'pants';
      this.currentStep = 4;
    } else if ( currentlyChoosing === 'shoes' && (this.selectedShirtColor && this.selectedPantsColor) )  {
      // 6
      console.log(6);
      this.currentlyChoosing = 'shoes';
      this.currentStep = 4;
    } else if ( currentlyChoosing === 'shirt' && (!this.selectedPantsColor || !this.selectedShoeColor) )  {
      // 1
      console.log(1);
      this.currentlyChoosing = 'shirt';
      this.currentStep = 3;
    } else if ( currentlyChoosing === 'pants' && (!this.selectedShirtColor || !this.selectedShoeColor) )  {
      // 2
      console.log(2);
      this.currentlyChoosing = 'pants';
      this.currentStep = 3;
    } else if ( currentlyChoosing === 'shoes' && (!this.selectedShirtColor || !this.selectedPantsColor) )  {
      // 3
      console.log(3);
      this.currentlyChoosing = 'shoes';
      this.currentStep = 3;
    } else {
      console.log('errorrrrrrrrrrrrrrrr');
    }
  }

  selectSkinTone(skinTone) {
    this.selectedSkinTone = skinTone;
    this.filteredShirtColors.length = 0;
    this.skinShirts.forEach(skinShirt => {
      if (skinShirt.skin_tone_id.id === this.selectedSkinTone.id) {
        this.filteredShirtColors.push(skinShirt.shirt_color_id);
      }
    });
  }

  selectShirtColor(shirtColor) {
    this.selectedShirtColor = shirtColor;
    this.outfit.shirt = this.selectedShirtColor;

    console.log(this.selectedShirtColor);

    // selecting shirt: we have to only sort pants, and only if pants are not already set
    // but if shoes are already set, only show pants that match both shirt and shoes
    // if shoes not set, display all matching pants with shirt
    if (!this.selectedPantsColor && !this.selectedShoeColor) {
      // sort pants based on shirt only
      this.filteredPantsColors.length = 0;
      this.shirtPants.forEach(shirtPants => {
        if (shirtPants.shirt_color_id.id === this.selectedShirtColor.id) {
          this.filteredPantsColors.push(shirtPants.pant_color_id);
        }
      });
    } else if (!this.selectedPantsColor && this.selectedShoeColor) {
      // sort pants based on shirt and shoes
      // need only pants thats match both selected shirt and shoes, eg. shirtColor: 2 (black), shoeColor: 1 (black)
      this.filteredPantsColors.length = 0;

      // check if pants match with selected shirt color
      this.shirtPants.forEach(shirtPants => {
        if (shirtPants.shirt_color_id.id === this.selectedShirtColor.id) {

          // good pant match with shirt, now check if there is a pant-shoe combo with good pant-selected shoe combo
          this.pantsShoes.forEach(pantsShoes => {
            if (pantsShoes.pant_color_id.id === shirtPants.pant_color_id.id && pantsShoes.shoe_color_id.id === this.selectedShoeColor.id) {
              this.filteredPantsColors.push(shirtPants.pant_color_id);
            }
          });

        }
      });

    } else {
      console.log('pants already set, nothing to sort!');
    }
  }

  selectPantsColor(pantsColor) {
    this.selectedPantsColor = pantsColor;
    this.outfit.pants = this.selectedPantsColor;

    console.log(this.selectedPantsColor);

    /*  selecting pants: we have to sort shirts AND shoes, but only if they are not already set
        if shirt not set, display all matching shirt with pants
        if shoes not set, display all matching shoes with pants
    */

    if (!this.selectedShirtColor) {
      // display all matching shirt with pants
      this.filteredShirtColors.length = 0;
      this.shirtPants.forEach(shirtPants => {
        if (shirtPants.pant_color_id.id === this.selectedPantsColor.id) {
          this.filteredShirtColors.push(shirtPants.shirt_color_id);
        }
      });
    }

    if (!this.selectedShoeColor) {
      // display all matching shoes with pants
      this.filteredShoeColors.length = 0;
      this.pantsShoes.forEach(pantsShoes => {
        if (pantsShoes.pant_color_id.id === this.selectedPantsColor.id) {
          this.filteredShoeColors.push(pantsShoes.shoe_color_id);
        }
      });
    }

  }

  selectShoeColor(shoeColor) {
    this.selectedShoeColor = shoeColor;
    this.outfit.shoes = this.selectedShoeColor;

    console.log(this.selectedShoeColor);

    // selecting shoes: we have to only sort pants, and only if pants are not already set
    // but if shirt is already set, only show pants that match both shirt and shoes
    // if shirt is not set, display all matching pants with shoes
    if (!this.selectedPantsColor && !this.selectedShirtColor) {
      console.log('// sort pants based on shoes only');
      // sort pants based on shoes only
      this.filteredPantsColors.length = 0;
      this.pantsShoes.forEach(pantsShoes => {
        if (pantsShoes.shoe_color_id.id === this.selectedShoeColor.id) {
          this.filteredPantsColors.push(pantsShoes.pant_color_id);
        }
      });
    } else if (!this.selectedPantsColor && this.selectedShirtColor) {
      console.log('// sort pants based on shirt and shoes');
      // sort pants based on shirt and shoes
      // need only pants thats match both selected shirt and shoes, eg. shirtColor: 2 (black), shoeColor: 1 (black)
      this.filteredPantsColors.length = 0;

      // check if pants match with selected shoe color
      this.pantsShoes.forEach(pantsShoes => {
        if (pantsShoes.shoe_color_id.id === this.selectedShoeColor.id) {

          // good pant match with shoe, now check if there is a pant-shirt combo with good pant-selected shirt combo
          this.shirtPants.forEach(shirtPants => {
            if (shirtPants.pant_color_id.id === pantsShoes.pant_color_id.id &&
                shirtPants.shirt_color_id.id === this.selectedShirtColor.id) {
              this.filteredPantsColors.push(pantsShoes.pant_color_id);
            }
          });

        }
      });
    } else {
      console.log('pants already set, nothing to sort!');
    }
  }

  selectPrevious(item: string) {
    let index: number;
    if (item === 'shirt') {
      index = this.filteredShirtColors.indexOf(this.selectedShirtColor);
      index <= 0 ? index = this.filteredShirtColors.length - 1 : index--;
      this.selectShirtColor(this.filteredShirtColors[index]);
    } else if (item === 'pants') {
      index = this.filteredPantsColors.indexOf(this.selectedPantsColor);
      index <= 0 ? index = this.filteredPantsColors.length - 1 : index--;
      this.selectPantsColor(this.filteredPantsColors[index]);
    } else if (item === 'shoes') {
      index = this.filteredShoeColors.indexOf(this.selectedShoeColor);
      index <= 0 ? index = this.filteredShoeColors.length - 1 : index--;
      this.selectShoeColor(this.filteredShoeColors[index]);
    } else {
      console.log('error, unknown item');
    }
  }

  selectNext(item: string) {
    let index: number;
    if (item === 'shirt') {
      index = this.filteredShirtColors.indexOf(this.selectedShirtColor);
      index === this.filteredShirtColors.length - 1 ? index = 0 : index++;
      this.selectShirtColor(this.filteredShirtColors[index]);
    } else if (item === 'pants') {
      index = this.filteredPantsColors.indexOf(this.selectedPantsColor);
      index === this.filteredPantsColors.length - 1 ? index = 0 : index++;
      this.selectPantsColor(this.filteredPantsColors[index]);
    } else if (item === 'shoes') {
      index = this.filteredShoeColors.indexOf(this.selectedShoeColor);
      index === this.filteredShoeColors.length - 1 ? index = 0 : index++;
      this.selectShoeColor(this.filteredShoeColors[index]);
    } else {
      console.log('error, unknown item');
    }
  }

  startOver() {
    this.currentStep = 1;
    this.currentTask = 'Select one of the clothes to start:';
    this.currentlyChoosing = '';

    this.selectedSkinTone = false;
    this.selectedShirtColor = false;
    this.selectedPantsColor = false;
    this.selectedShoeColor = false;

    this.filteredSkinTones = Array.from(this.skinTones);
    this.filteredShirtColors = Array.from(this.shirtColors);
    this.filteredPantsColors = Array.from(this.pantsColors);
    this.filteredShoeColors = Array.from(this.shoeColors);

    this.outfit = {
      id: 0,
      name: '',
      shirt: {
        id: 0,
        color: '',
        colorcode: '#FFF'
      },
      pants: {
        id: 0,
        color: '',
        colorcode: '#FFF'
      },
      shoes: {
        id: 0,
        color: '',
        colorcode: '#FFF'
      }
    };
  }

  resetSkinTone() {
    this.selectedSkinTone = false;
    this.filteredSkinTones = Array.from(this.skinTones);
    this.filteredShirtColors = Array.from(this.shirtColors);
    this.resetShirtColor();
    console.log('skin tones', this.skinTones);
    console.log('filtered skin tones', this.filteredSkinTones);
  }

  resetShirtColor() {
    this.selectedShirtColor = false;
    this.filteredShirtColors = Array.from(this.shirtColors);
    this.filteredPantsColors = Array.from(this.pantsColors);
    this.resetPantsColor();
    console.log('shirt colors', this.pantsColors);
    console.log('shirt colors', this.filteredPantsColors);
  }

  resetPantsColor() {
    this.selectedPantsColor = false;
    this.filteredPantsColors = Array.from(this.pantsColors);
    this.filteredShoeColors = Array.from(this.shoeColors);
    this.resetShoeColor();
    console.log('pants colors', this.shoeColors);
    console.log('filtered pants colors', this.filteredShoeColors);
  }

  resetShoeColor() {
    this.selectedShoeColor = false;
    this.filteredShoeColors = Array.from(this.shoeColors);
    console.log('shoe colors', this.shoeColors);
    console.log('filtered shoe colors', this.filteredShoeColors);
  }

  saveOutfit() {
    let prompt = this.alertCtrl.create({
      title: 'Save Outfit',
      message: "Enter the name of this outfit:",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            const outfit = {
              shirt: this.selectedShirtColor,
              pants: this.selectedPantsColor,
              shoes: this.selectedShoeColor,
              name: name || 'N/A'
            };
            this.wardrobeService.saveOutfit(outfit).subscribe(response => {
              console.log(response);
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
