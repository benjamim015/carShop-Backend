import {
  AddCarToCarShop,
  Controller,
  HttpRequest,
  HttpResponse,
} from './addCarToCarShopProtocols';

export class AddCarToCarShopController implements Controller {
  constructor(private addCarToCarShop: AddCarToCarShop) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.addCarToCarShop.add(httpRequest.body);
    return null;
  }
}
