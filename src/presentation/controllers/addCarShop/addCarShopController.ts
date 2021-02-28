import { CnpjInUseError } from '@/presentation/errors';
import {
  badRequest,
  serverError,
  ok,
  forbidden,
} from '@/presentation/helpers/http/http';
import {
  Controller,
  AddCarShop,
  HttpRequest,
  HttpResponse,
  Validation,
} from './addCarShopProtocols';

export class AddCarShopController implements Controller {
  constructor(private addCarShop: AddCarShop, private validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const { name, cnpj } = httpRequest.body;
      const carShop = await this.addCarShop.add({
        name,
        cnpj,
      });
      if (!carShop) {
        return forbidden(new CnpjInUseError());
      }
      return ok(carShop);
    } catch (error) {
      return serverError();
    }
  }
}
