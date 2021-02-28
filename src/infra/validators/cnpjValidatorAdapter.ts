import { CnpjValidator } from '@/validation/protocols/cnpjValidator';
import { cnpjValidator } from 'some-validations';

export class CnpjValidatorAdapter implements CnpjValidator {
  isValid(cnpj: string): boolean {
    return cnpjValidator.isValid(cnpj);
  }
}
