import { LoadCarShopsRepository } from '@/data/protocols/loadCarShopsRepository';
import { LoadCarShops } from '@/domain/useCases/loadCarShops';
import { CarShopModel } from '../addCarShop/dbAddCarShopProtocols';

export class DbLoadCarShops implements LoadCarShops {
  constructor(private loadCarShopsRepository: LoadCarShopsRepository) {}

  async load(): Promise<CarShopModel[]> {
    const carShops = await this.loadCarShopsRepository.loadAll();
    return carShops;
  }
}
