import { CarShopModel } from '../useCases/addCarShop/dbAddCarShopProtocols';

export interface LoadCarShopsRepository {
  loadAll: () => Promise<CarShopModel[]>;
}
