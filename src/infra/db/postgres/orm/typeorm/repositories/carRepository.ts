import { AddCarToCarShopRepository } from '@/data/protocols/addCarToCarShopRepository';
import { CarModel } from '@/domain/models/car';
import { AddCarToCarShopModel } from '@/domain/useCases/addCarToCarShop';
import { getRepository } from 'typeorm';
import { Car } from '../entities/car';

export class CarPgTypeORMRepository implements AddCarToCarShopRepository {
  async add(carData: AddCarToCarShopModel): Promise<CarModel> {
    const carRepository = getRepository(Car);
    const car = carRepository.create(carData);
    await carRepository.save(car);
    return car;
  }
}
