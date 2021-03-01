import { ok, serverError } from '@/presentation/helpers/http/http';
import {
  AddCarToCarShop,
  Controller,
  HttpRequest,
  HttpResponse,
} from './addCarToCarShopProtocols';

export class AddCarToCarShopController implements Controller {
  constructor(private addCarToCarShop: AddCarToCarShop) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const car = await this.addCarToCarShop.add(httpRequest.body);
      return ok(car);
    } catch (error) {
      return serverError();
    }
  }
}
