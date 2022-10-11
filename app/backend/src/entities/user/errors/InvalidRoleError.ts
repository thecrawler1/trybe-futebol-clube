import ValidationError from '../../../errors/ValidationError';

export default class InvalidRoleError extends ValidationError {
  constructor() {
    super('The user role does not exist');

    this.name = 'InvalidRoleError';
  }
}
