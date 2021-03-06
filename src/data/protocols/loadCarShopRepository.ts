import { CarShopModel } from '../useCases/addCarShop/dbAddCarShopProtocols';

export interface LoadCarShopRepository {
  load: (carShopId: string) => Promise<CarShopModel>;
}
