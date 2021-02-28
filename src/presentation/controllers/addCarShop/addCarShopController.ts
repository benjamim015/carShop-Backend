import {
  MissingParamError,
  InvalidParamError,
  CnpjInUseError,
} from '@/presentation/errors';
import {
  badRequest,
  serverError,
  ok,
  forbidden,
} from '@/presentation/helpers/http';
import {
  Controller,
  CnpjValidator,
  AddCarShop,
  HttpRequest,
  HttpResponse,
  Validation,
} from './addCarShopProtocols';

export class AddCarShopController implements Controller {
  constructor(
    private cnpjValidator: CnpjValidator,
    private addCarShop: AddCarShop,
    private validation: Validation,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body);
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
      if (!carShop) {
        return forbidden(new CnpjInUseError());
      }
      return ok(carShop);
    } catch (error) {
      return serverError();
    }
  }
}
