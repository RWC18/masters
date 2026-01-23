import { DEFAULT_CATCH_MESSAGE, LOGIN_MESSAGES, REGISTRATION_MESSAGES } from '../../constants/constants';
import { IUserRegistration, IUserLogin } from '../../types';
import { User } from '../models/users';
import { comparePassword, generateAccessToken, hashPassword } from '../utils/hash';

const createNewUser = async (userData: IUserRegistration) => {
  try {
    console.log(userData)
    if (userData.password.trim().length === 0) return { status: false, data: null, message: REGISTRATION_MESSAGES.NO_PASS };
    if (userData.email.trim().length === 0) return { status: false, data: null, message: REGISTRATION_MESSAGES.NO_EMAIL };
    if (userData.full_name.trim().length === 0) return { status: false, data: null, message: REGISTRATION_MESSAGES.NO_FULLNAME };

    const storedUserData = await findUserByEmail(userData.email);

    if (storedUserData !== null) return { status: false, data: null, message: REGISTRATION_MESSAGES.EMAIL_EXISTS };
    const hashedPassword = await hashPassword(userData.password);
    const accessToken = await generateAccessToken(userData.email);

    const user = new User({
      email: userData.email,
      full_name: userData.full_name,
      password: hashedPassword,
      access_token: accessToken,
    });

    const newUser = await user.save();

    if (newUser) {
      return { status: true, data: newUser, message: REGISTRATION_MESSAGES.SUCCESS };
    } else {
      return { status: false, data: null, message: REGISTRATION_MESSAGES.CATCH };
    }
  } catch (e) {
    console.log(e);
    return { status: false, data: null, message: DEFAULT_CATCH_MESSAGE };
  }
};

const loginByEmail = async (userData: IUserLogin) => {
  try {
    if (userData.password.trim().length === 0) return { status: false, data: null, message: LOGIN_MESSAGES.NO_PASS };
    if (userData.email.trim().length === 0) return { status: false, data: null, message: LOGIN_MESSAGES.NO_EMAIL };

    const storedUserData = await findUserByEmail(userData.email);

    if (storedUserData === null) return { status: false, data: null, message: LOGIN_MESSAGES.EMAIL_NOT_EXISTS };

    const passCompareStatus = await comparePassword(userData.password, storedUserData.password);

    if (passCompareStatus) {
      return { status: true, result: {access_token: storedUserData.access_token}, message: LOGIN_MESSAGES.SUCCESS };
    } else {
      console.log(passCompareStatus);
      return { status: false, data: null, message: LOGIN_MESSAGES.CATCH };
    }
  } catch (e) {
    console.log(e);
    return { status: false, data: null, message: DEFAULT_CATCH_MESSAGE };
  }
};

const getUserByAccessToken = async (accessToken: string) => {
  try {
    const user = await User.findOne({access_token: accessToken});

    if (user) {
      const res = {
        email: user.email,
        full_name: user.full_name,
        _id: user._id,
      }

      return { status: true, result: res, message: LOGIN_MESSAGES.SUCCESS };
    } else {
      return { status: false, result: null, message: LOGIN_MESSAGES.CATCH };
    }
  } catch (e) {
    console.log(e);
    return { status: false, data: null, message: DEFAULT_CATCH_MESSAGE };
  }
};

const findUserByEmail = async (userEmail: string) => {
  const user = await User.findOne({ email: userEmail });
  return user;
};

export default { createNewUser, findUserByEmail, loginByEmail, getUserByAccessToken };
