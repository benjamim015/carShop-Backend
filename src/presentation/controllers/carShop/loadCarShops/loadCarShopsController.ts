import { noContent, ok, serverError } from '@/presentation/helpers/http/http';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadCarShops,
} from './loadCarShopProtocols';

export class LoadCarShopsController implements Controller {
  constructor(private loadCarShops: LoadCarShops) {}

  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const carShops = await this.loadCarShops.load();
      return carShops.length ? ok(carShops) : noContent();
    } catch (error) {
      return serverError();
    }
  }
}
