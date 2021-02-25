import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../errors/missingParamError';
import { badRequest } from '../helpers/http';

export class AddCarShopController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'));
    }
    if (!httpRequest.body.cnpj) {
      return badRequest(new MissingParamError('cnpj'));
    }
  }
}
