import { LoadCarShopRepository } from '@/data/protocols/loadCarShopRepository';
import { LoadCarShopsRepository } from '@/data/protocols/loadCarShopsRepository';
import {
  AddCarShopRepository,
  AddCarShopModel,
  CarShopModel,
} from '@/data/useCases/addCarShop/dbAddCarShopProtocols';
import { CarShop } from '@/infra/db/postgres/orm/typeorm/entities/carShop';
import { getRepository } from 'typeorm';

export class CarShopPgTypeORMRepository
  implements
    AddCarShopRepository,
    LoadCarShopsRepository,
    LoadCarShopRepository {
  async add(carShopData: AddCarShopModel): Promise<CarShopModel> {
    const carShopRepository = getRepository(CarShop);
    const carShop = carShopRepository.create(carShopData);
    if (await carShopRepository.findOne({ where: { cnpj: carShop.cnpj } })) {
      return null;
    }
    await carShopRepository.save(carShop);
    return carShop;
  }

  async loadAll(): Promise<CarShopModel[]> {
    const carShopsRepository = getRepository(CarShop);
    const carShops = await carShopsRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
    return carShops;
  }

  async load(carShopId: string): Promise<CarShopModel> {
    const carShopRepository = getRepository(CarShop);
    const carShop = await carShopRepository.findOne({
      relations: ['cars'],
      where: {
        id: carShopId,
      },
    });
    return carShop;
  }
}
