import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error connection to database';
  constructor() {
    super('Error connection to database');
    // because we're extending a built-in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors(): Array<{ message: string }> {
    return [{ message: this.reason }];
  }
}
