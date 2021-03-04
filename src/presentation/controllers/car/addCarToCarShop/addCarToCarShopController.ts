import { MissingParamError } from '@/presentation/errors';
import fs from 'fs';
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
        return badRequest(new MissingParamError('image'));
      }
      const car = await this.addCarToCarShop.add({
        ...body,
        image: file.filename,
      });
      return ok(car);
    } catch (error) {
      return serverError();
    }
  }
}
