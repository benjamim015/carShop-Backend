import { AddCarShopRepository } from '@/data/protocols/addCarShopRepository';
import { CarShopModel } from '@/domain/models/carShop';
import { AddCarShopModel } from '@/domain/useCases/addCarShop';
import { getRepository, Repository } from 'typeorm';
import { CarShop } from '@/infra/db/postgres/orm/typeorm/entities/carShop';

export class CarShopPgTypeORMRepository implements AddCarShopRepository {
  private ormRepository: Repository<CarShop>;

  constructor() {
    this.ormRepository = getRepository(CarShop);
  }

  async add(carShopData: AddCarShopModel): Promise<CarShopModel> {
    const carShop = this.ormRepository.create(carShopData);
    await this.ormRepository.save(carShop);
    return carShop;
  }
}
