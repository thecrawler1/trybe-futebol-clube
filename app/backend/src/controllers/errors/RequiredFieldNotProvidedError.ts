import ValidationError from '../../errors/ValidationError';

export default class RequiredFieldNotProvidedError extends ValidationError {
  constructor() {
    super('All fields must be filled');

    this.name = 'RequiredFieldNotProvidedError';
  }
}
