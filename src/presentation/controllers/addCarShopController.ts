import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../errors/missingParamError';
import { badRequest } from '../helpers/http';

export class AddCarShopController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'cnpj'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
  }
}
