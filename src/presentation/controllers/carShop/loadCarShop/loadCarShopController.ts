import { ok, serverError } from '@/presentation/helpers/http/http';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadCarShop,
} from './loadCarShopProtocols';

export class LoadCarShopController implements Controller {
  constructor(private loadCarShop: LoadCarShop) {}

  async handle({ params }: HttpRequest): Promise<HttpResponse> {
    try {
      const carShop = await this.loadCarShop.load(params.id);
      return ok(carShop);
    } catch (error) {
      return serverError();
    }
  }
}
