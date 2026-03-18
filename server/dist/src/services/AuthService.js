"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants/constants");
const users_1 = require("../models/users");
const hash_1 = require("../utils/hash");
const createNewUser = async (userData) => {
    try {
        console.log(userData);
        if (userData.password.trim().length === 0)
            return { status: false, data: null, message: constants_1.REGISTRATION_MESSAGES.NO_PASS };
        if (userData.email.trim().length === 0)
            return { status: false, data: null, message: constants_1.REGISTRATION_MESSAGES.NO_EMAIL };
        if (userData.full_name.trim().length === 0)
            return { status: false, data: null, message: constants_1.REGISTRATION_MESSAGES.NO_FULLNAME };
        const storedUserData = await findUserByEmail(userData.email);
        if (storedUserData !== null)
            return { status: false, data: null, message: constants_1.REGISTRATION_MESSAGES.EMAIL_EXISTS };
        const hashedPassword = await (0, hash_1.hashPassword)(userData.password);
        const accessToken = await (0, hash_1.generateAccessToken)(userData.email);
        const user = new users_1.User({
            email: userData.email,
            full_name: userData.full_name,
            password: hashedPassword,
            access_token: accessToken,
        });
        const newUser = await user.save();
        if (newUser) {
            return { status: true, data: newUser, message: constants_1.REGISTRATION_MESSAGES.SUCCESS };
        }
        else {
            return { status: false, data: null, message: constants_1.REGISTRATION_MESSAGES.CATCH };
        }
    }
    catch (e) {
        console.log(e);
        return { status: false, data: null, message: constants_1.DEFAULT_CATCH_MESSAGE };
    }
};
const loginByEmail = async (userData) => {
    try {
        if (userData.password.trim().length === 0)
            return { status: false, data: null, message: constants_1.LOGIN_MESSAGES.NO_PASS };
        if (userData.email.trim().length === 0)
            return { status: false, data: null, message: constants_1.LOGIN_MESSAGES.NO_EMAIL };
        const storedUserData = await findUserByEmail(userData.email);
        if (storedUserData === null)
            return { status: false, data: null, message: constants_1.LOGIN_MESSAGES.EMAIL_NOT_EXISTS };
        const passCompareStatus = await (0, hash_1.comparePassword)(userData.password, storedUserData.password);
        if (passCompareStatus) {
            return { status: true, result: { access_token: storedUserData.access_token }, message: constants_1.LOGIN_MESSAGES.SUCCESS };
        }
        else {
            console.log(passCompareStatus);
            return { status: false, data: null, message: constants_1.LOGIN_MESSAGES.CATCH };
        }
    }
    catch (e) {
        console.log(e);
        return { status: false, data: null, message: constants_1.DEFAULT_CATCH_MESSAGE };
    }
};
const getUserByAccessToken = async (accessToken) => {
    try {
        const user = await users_1.User.findOne({ access_token: accessToken });
        if (user) {
            const res = {
                email: user.email,
                full_name: user.full_name,
                _id: user._id,
            };
            return { status: true, result: res, message: constants_1.LOGIN_MESSAGES.SUCCESS };
        }
        else {
            return { status: false, result: null, message: constants_1.LOGIN_MESSAGES.CATCH };
        }
    }
    catch (e) {
        console.log(e);
        return { status: false, data: null, message: constants_1.DEFAULT_CATCH_MESSAGE };
    }
};
const findUserByEmail = async (userEmail) => {
    const user = await users_1.User.findOne({ email: userEmail });
    return user;
};
exports.default = { createNewUser, findUserByEmail, loginByEmail, getUserByAccessToken };
//# sourceMappingURL=AuthService.js.map