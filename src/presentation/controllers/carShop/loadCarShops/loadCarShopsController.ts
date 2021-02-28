import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadCarShops,
} from './loadCarShopProtocols';

export class LoadCarShopsController implements Controller {
  constructor(private loadCarShops: LoadCarShops) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadCarShops.load();
    return null;
  }
}
