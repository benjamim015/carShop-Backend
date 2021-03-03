import { CnpjInUseError, MissingParamError } from '@/presentation/errors';
import {
  badRequest,
  serverError,
  ok,
  forbidden,
} from '@/presentation/helpers/http/http';
import fs from 'fs';
import {
  Controller,
  AddCarShop,
  HttpRequest,
  HttpResponse,
  Validation,
} from './addCarShopProtocols';

export class AddCarShopController implements Controller {
  constructor(private addCarShop: AddCarShop, private validation: Validation) {}

  async handle({ body, file }: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(body);
      if (error) {
        if (fs.existsSync(file.path)) {
          await fs.promises.unlink(file.path);
        }
        return badRequest(error);
      }
      if (!file) {
        return badRequest(new MissingParamError('car_shop_image'));
      }
      const { name, cnpj } = body;
      const carShop = await this.addCarShop.add({
        name,
        cnpj,
        image: file.filename,
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
