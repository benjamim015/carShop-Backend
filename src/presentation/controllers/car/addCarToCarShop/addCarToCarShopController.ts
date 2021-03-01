import { ok, serverError } from '@/presentation/helpers/http/http';
import {
  AddCarToCarShop,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from './addCarToCarShopProtocols';

export class AddCarToCarShopController implements Controller {
  constructor(
    private validation: Validation,
    private addCarToCarShop: AddCarToCarShop,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body);
      const car = await this.addCarToCarShop.add(httpRequest.body);
      return ok(car);
    } catch (error) {
      return serverError();
    }
  }
}
