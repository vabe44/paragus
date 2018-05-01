import { IClothing } from './Clothing';

export interface IOutfit {
    shirt: IClothing;
    pants: IClothing;
    shoes: IClothing;
    name: string;
}
