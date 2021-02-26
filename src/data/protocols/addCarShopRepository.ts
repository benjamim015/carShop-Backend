import { AddCarShopModel } from '@/domain/useCases/addCarShop';
import { CarShopModel } from '@/domain/models/carShop';

export type AddCarShopRepository = {
  add: (carShop: AddCarShopModel) => Promise<CarShopModel>;
};
