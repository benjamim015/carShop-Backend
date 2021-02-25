import { AddCarShopController } from '@/presentation/controllers/addCarShopController';
import { MissingParamError } from '@/presentation/errors/missingParamError';

describe('AddCarShopController', () => {
  it('Should return 400 if no name is provided', () => {
    const sut = new AddCarShopController();
    const httpRequest = {
      body: {
        cnpj: 'any_cnpj',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('Should return 400 if no cnpj is provided', () => {
    const sut = new AddCarShopController();
    const httpRequest = {
      body: {
        name: 'any_name',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('cnpj'));
  });
});
