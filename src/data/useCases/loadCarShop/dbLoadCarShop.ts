import { LoadCarShopRepository } from '@/data/protocols/loadCarShopRepository';
import { LoadCarShop } from '@/domain/useCases/loadCarShop';
import { CarShopModel } from '../addCarShop/dbAddCarShopProtocols';

export class DbLoadCarShop implements LoadCarShop {
  constructor(private loadCarShopsRepository: LoadCarShopRepository) {}

  async load(): Promise<CarShopModel> {
    const carShop = await this.loadCarShopsRepository.load();
    return carShop;
  }
}
