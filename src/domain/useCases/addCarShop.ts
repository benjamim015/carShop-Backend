import { CarShopModel } from '../models/carShop';

export type AddCarShopModel = Omit<CarShopModel, 'id'>;

export interface AddCarShop {
  add: (carShop: AddCarShopModel) => Promise<CarShopModel>;
}
