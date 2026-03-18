"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// middleware
const httpError_1 = require("./httpError");
const ErrorHandler = (error, req, res, next) => {
    if (error && error instanceof httpError_1.HttpError) {
        res.status(error.status || 400).json({ msg: error.message, status: error.status });
    }
    else {
        res.status(500).json({ msg: 'Internal error' });
    }
    next(); // Ensure Express knows the request is handled
};
exports.default = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map