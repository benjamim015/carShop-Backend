import {
  AddCarToCarShop,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  ok,
  badRequest,
  serverError,
} from './addCarToCarShopProtocols';

export class AddCarToCarShopController implements Controller {
  constructor(
    private validation: Validation,
    private addCarToCarShop: AddCarToCarShop,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const car = await this.addCarToCarShop.add(httpRequest.body);
      return ok(car);
    } catch (error) {
      return serverError();
    }
  }
}
