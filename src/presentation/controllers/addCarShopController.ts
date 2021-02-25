import { AddCarShop } from '@/domain/useCases/addCarShop';
import { MissingParamError, InvalidParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http';
import {
  Controller,
  CnpjValidator,
  HttpRequest,
  HttpResponse,
} from '../protocols';

export class AddCarShopController implements Controller {
  constructor(
    private cnpjValidator: CnpjValidator,
    private addCarShop: AddCarShop,
  ) {}

  handle(httpRequest: HttpRequest): HttpResponse {
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
      this.addCarShop.add({
        name,
        cnpj,
      });
    } catch (error) {
      return serverError();
    }
  }
}
