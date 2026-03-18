"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthService_1 = __importDefault(require("../services/AuthService"));
const router = express_1.default.Router();
const userRegister = async (req, res) => {
    const userData = req.body;
    try {
        const respone = await AuthService_1.default.createNewUser(userData);
        if (respone.status) {
            res.status(200).json(respone);
        }
        else {
            res.status(400).json(respone);
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ status: false, message: 'FAILED' });
    }
};
const userLogin = async (req, res) => {
    const userData = req.body;
    try {
        const respone = await AuthService_1.default.loginByEmail(userData);
        if (respone.status) {
            res.status(200).json(respone);
        }
        else {
            res.status(400).json(respone);
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ status: false, message: 'FAILED' });
    }
};
const getUserByAccessToken = async (req, res) => {
    const { access_token } = req.body;
    console.log(access_token);
    try {
        const respone = await AuthService_1.default.getUserByAccessToken(access_token);
        if (respone.status) {
            res.status(200).json(respone);
        }
        else {
            res.status(400).json(respone);
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ status: false, message: 'FAILED' });
    }
};
router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/get-user', getUserByAccessToken);
exports.default = router;
//# sourceMappingURL=AuthController.js.map