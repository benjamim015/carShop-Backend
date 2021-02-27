import { AddCarShopRepository } from '@/data/protocols/addCarShopRepository';
import { CarShopModel } from '@/domain/models/carShop';
import { AddCarShopModel } from '@/domain/useCases/addCarShop';
import { CarShop } from '@/infra/db/postgres/orm/typeorm/entities/carShop';
import { getRepository } from 'typeorm';

export class CarShopPgTypeORMRepository implements AddCarShopRepository {
  async add(carShopData: AddCarShopModel): Promise<CarShopModel> {
    const carShopRepository = getRepository(CarShop);
    const carShop = carShopRepository.create(carShopData);
    await carShopRepository.save(carShop);
    return carShop;
  }
}
