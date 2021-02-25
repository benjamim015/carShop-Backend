import { CnpjValidator } from '@/presentation/protocols/cnpjValidator';

export class CnpjValidatorAdapter implements CnpjValidator {
  isValid(cnpj: string): boolean {
    return false;
  }
}
