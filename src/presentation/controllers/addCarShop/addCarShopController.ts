import { MissingParamError, InvalidParamError } from '@/presentation/errors';
import { badRequest, serverError, ok } from '@/presentation/helpers/http';
import {
  Controller,
  CnpjValidator,
  AddCarShop,
  HttpRequest,
  HttpResponse,
} from './addCarShopProtocols';

export class AddCarShopController implements Controller {
  constructor(
    private cnpjValidator: CnpjValidator,
    private addCarShop: AddCarShop,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'cnpj'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const { name, cnpj } = httpRequest.body;
      const isValidCnpj = this.cnpjValidator.isValid(cnpj);
      if (!isValidCnpj) {
        return badRequest(new InvalidParamError('cnpj'));
      }
      const carShop = await this.addCarShop.add({
        name,
        cnpj,
      });
      return ok(carShop);
    } catch (error) {
      return serverError();
    }
  }
}
