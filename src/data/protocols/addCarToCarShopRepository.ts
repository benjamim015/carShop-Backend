import { CarModel } from '@/domain/models/car';
import { AddCarToCarShopModel } from '@/domain/useCases/addCarToCarShop';

export type AddCarToCarShopRepository = {
  add: (car: AddCarToCarShopModel) => Promise<CarModel>;
};
