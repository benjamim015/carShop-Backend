import { CarShopModel } from '../models/carShop';

export interface LoadCarShops {
  load: () => Promise<CarShopModel[]>;
}
