import { AddCarShopController } from '../../../src/presentation/controllers/addCarShopController';

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
    expect(httpResponse.body).toEqual(new Error('Missing param: name'));
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
    expect(httpResponse.body).toEqual(new Error('Missing param: cnpj'));
  });
});
