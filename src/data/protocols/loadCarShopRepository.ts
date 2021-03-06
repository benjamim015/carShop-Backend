import { CarShopModel } from '../useCases/addCarShop/dbAddCarShopProtocols';

export interface LoadCarShopRepository {
  load: () => Promise<CarShopModel>;
}
