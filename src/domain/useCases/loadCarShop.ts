import { CarShopModel } from '../models/carShop';

export interface LoadCarShop {
  load: () => Promise<CarShopModel>;
}
