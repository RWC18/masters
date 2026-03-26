"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const keys_1 = require("./keys");
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const ErrorHandler_1 = __importDefault(require("./src/middleware/ErrorHandler"));
const controller_1 = require("./src/controller");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: true, // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Methods',
    ],
    credentials: true,
    optionsSuccessStatus: 200, // For legacy browser support
    preflightContinue: false,
}));
// Handle preflight OPTIONS requests explicitly for Cloudflare compatibility
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400'); // 24 hours
    res.sendStatus(200);
});
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
// Serve persisted generated images (Option A)
app.use('/generated', express_1.default.static(path_1.default.join(process.cwd(), 'public', 'generated')));
// Support both legacy routes (/auth, /generation, ...) and versioned routes (/api/v1/*)
app.use('/api/v1', controller_1.router);
app.use(controller_1.router);
app.use(ErrorHandler_1.default);
mongoose_1.default
    .connect(keys_1.MONGO_URL)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));
const port = keys_1.PORT;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
//# sourceMappingURL=index.js.map