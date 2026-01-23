export class HttpError extends Error {
  status;
  constructor(message: string, status: any) {
    super(message);
    this.status = status;
  }
}

export class BadRequest extends HttpError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFound extends HttpError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class Forbidden extends HttpError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class Unauthorized extends HttpError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class MethodNotAllowed extends HttpError {
  constructor(message: string) {
    super(message, 405);
  }
}

export class ConflictError extends HttpError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string) {
    super(message, 500);
  }
}
