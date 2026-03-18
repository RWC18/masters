"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const HealthController_1 = __importDefault(require("./HealthController"));
const AuthController_1 = __importDefault(require("./AuthController"));
const GenerationController_1 = __importDefault(require("./GenerationController"));
const HistoryController_1 = __importDefault(require("./HistoryController"));
const router = express_1.default.Router();
exports.router = router;
router.use('/health', HealthController_1.default);
router.use('/auth', AuthController_1.default);
router.use('/generation', GenerationController_1.default);
router.use('/generation', HistoryController_1.default);
router.use('/', (req, res) => {
    res.status(200).json({ message: 'ok' });
});
//# sourceMappingURL=index.js.map