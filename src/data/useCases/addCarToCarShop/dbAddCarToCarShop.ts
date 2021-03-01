import { AddCarToCarShopRepository } from '@/data/protocols/addCarToCarShopRepository';
import { CarModel } from '@/domain/models/car';
import {
  AddCarToCarShop,
  AddCarToCarShopModel,
} from '@/domain/useCases/addCarToCarShop';

export class DbAddCarToCarShop implements AddCarToCarShop {
  constructor(private addCarToCarShopRepository: AddCarToCarShopRepository) {}

  async add(carShopData: AddCarToCarShopModel): Promise<CarModel> {
    const car = await this.addCarToCarShopRepository.add(carShopData);
    return car;
  }
}
