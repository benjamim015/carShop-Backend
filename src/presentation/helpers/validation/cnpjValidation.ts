import { InvalidParamError } from '@/presentation/errors';
import { CnpjValidator } from '@/presentation/protocols/cnpjValidator';
import { Validation } from '../../protocols/validation';

export class CnpjValidation implements Validation {
  constructor(
    private fieldName: string,
    private cnpjValidator: CnpjValidator,
  ) {}

  validate(input: any): Error {
    const isValidCnpj = this.cnpjValidator.isValid(input[this.fieldName]);
    if (!isValidCnpj) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
