import UnauthorizedError from '../../errors/UnauthorizedError';

export default class TokenNotProvidedError extends UnauthorizedError {
  constructor() {
    super('Token not provided');

    this.name = 'TokenNotProvidedError';
  }
}
