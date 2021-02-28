import {
  AddCarShopRepository,
  AddCarShopModel,
  CarShopModel,
} from '@/data/useCases/addCarShop/dbAddCarShopProtocols';
import { CarShop } from '@/infra/db/postgres/orm/typeorm/entities/carShop';
import { getRepository } from 'typeorm';

export class CarShopPgTypeORMRepository implements AddCarShopRepository {
  async add(carShopData: AddCarShopModel): Promise<CarShopModel> {
    const carShopRepository = getRepository(CarShop);
    const carShop = carShopRepository.create(carShopData);
    if (await carShopRepository.findOne({ where: { cnpj: carShop.cnpj } })) {
      return null;
    }
    await carShopRepository.save(carShop);
    return carShop;
  }
}
