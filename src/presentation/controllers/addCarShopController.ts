import { MissingParamError, InvalidParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http';
import { CnpjValidator } from '../protocols/cnpjValidator';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class AddCarShopController implements Controller {
  constructor(private cnpjValidator: CnpjValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'cnpj'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const isValidCnpj = this.cnpjValidator.isValid(httpRequest.body.cnpj);
      if (!isValidCnpj) {
        return badRequest(new InvalidParamError('cnpj'));
      }
    } catch (error) {
      return serverError();
    }
  }
}
