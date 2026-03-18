"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.ConflictError = exports.MethodNotAllowed = exports.Unauthorized = exports.Forbidden = exports.NotFound = exports.BadRequest = exports.HttpError = void 0;
class HttpError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.HttpError = HttpError;
class BadRequest extends HttpError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequest = BadRequest;
class NotFound extends HttpError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFound = NotFound;
class Forbidden extends HttpError {
    constructor(message) {
        super(message, 403);
    }
}
exports.Forbidden = Forbidden;
class Unauthorized extends HttpError {
    constructor(message) {
        super(message, 401);
    }
}
exports.Unauthorized = Unauthorized;
class MethodNotAllowed extends HttpError {
    constructor(message) {
        super(message, 405);
    }
}
exports.MethodNotAllowed = MethodNotAllowed;
class ConflictError extends HttpError {
    constructor(message) {
        super(message, 409);
    }
}
exports.ConflictError = ConflictError;
class InternalServerError extends HttpError {
    constructor(message) {
        super(message, 500);
    }
}
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=httpError.js.map