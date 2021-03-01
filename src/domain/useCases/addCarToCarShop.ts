import { CarModel } from '../models/car';

export type AddCarToCarShopModel = Omit<CarModel, 'id'>;

export interface AddCarToCarShop {
  add: (car: AddCarToCarShopModel) => Promise<CarModel>;
}
