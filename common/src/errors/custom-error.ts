export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    // because we're extending a built-in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): Array<{ message: string; field?: string }>;
}
