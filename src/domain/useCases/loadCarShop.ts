import { CarShopModel } from '../models/carShop';

export interface LoadCarShop {
  load: (carShopId: string) => Promise<CarShopModel>;
}
