import {
  AddCarShop,
  AddCarShopModel,
  CarShopModel,
  AddCarShopRepository,
} from './dbAddCarShopProtocols';

export class DbAddCarShop implements AddCarShop {
  constructor(private addCarShopRepository: AddCarShopRepository) {}

  async add(carShopData: AddCarShopModel): Promise<CarShopModel> {
    await this.addCarShopRepository.add(carShopData);
    return null;
  }
}
