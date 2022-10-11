export default class HttpError extends Error {
  private readonly _statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this._statusCode = statusCode;
    this.name = 'HttpError';
  }

  get statusCode(): number {
    return this._statusCode;
  }
}
