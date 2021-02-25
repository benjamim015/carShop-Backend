import { AddCarShopController } from '../../../src/presentation/controllers/addCarShopController';

describe('AddCarShopController', () => {
  it('Should return 400 if no name is provided', () => {
    const sut = new AddCarShopController();
    const httpRequest = {
      cnpj: 'any_cnpj',
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
