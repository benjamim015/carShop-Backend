import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../errors/missingParamError';
import { badRequest } from '../helpers/http';
import { Controller } from '../protocols/controller';
import { CnpjValidator } from '../protocols/cnpjValidator';
import { InvalidParamError } from '../errors/invalidParamError';

export class AddCarShopController implements Controller {
  constructor(private cnpjValidator: CnpjValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
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
  }
}
