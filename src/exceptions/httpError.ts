class HttpError extends Error {
  
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;

    this.name = 'HttpError';
    Object.setPrototypeOf(this, new.target.prototype);
  }

}

export { HttpError }