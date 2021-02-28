import { ok } from '@/presentation/helpers/http/http';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadCarShops,
} from './loadCarShopProtocols';

export class LoadCarShopsController implements Controller {
  constructor(private loadCarShops: LoadCarShops) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const carShops = await this.loadCarShops.load();
    return ok(carShops);
  }
}
