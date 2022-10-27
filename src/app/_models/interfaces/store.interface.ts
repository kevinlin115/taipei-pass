import { IStoreSimple } from './store-simple.interface';

export interface IStore extends IStoreSimple {
  address: string;
  bannerImageURL: string;
  description: string;
  district: string;
  logoImageURL: string;

  lat: number,
  lng: number,
}
