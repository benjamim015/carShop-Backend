export class AddCarShopController {
  handle(httpRequest: any): any {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name'),
      };
    }
    if (!httpRequest.body.cnpj) {
      return {
        statusCode: 400,
        body: new Error('Missing param: cnpj'),
      };
    }
  }
}
