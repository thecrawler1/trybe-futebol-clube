import ValidationError from '../../../errors/ValidationError';

export default class InvalidIdError extends ValidationError {
  constructor() {
    super('Invalid Id');

    this.name = 'InvalidIdError';
  }
}
