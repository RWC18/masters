import express, { Response, Request } from 'express';
import { IUserLogin, IUserRegistration } from '../../types';
import { hashPassword } from '../utils/hash';
import AuthService from '../services/AuthService';

const router = express.Router();

const userRegister = async (req: Request, res: Response) => {
  const userData: IUserRegistration = req.body;
  try {
    const respone = await AuthService.createNewUser(userData);
    if (respone.status) {
      res.status(200).json(respone);
    } else {
      res.status(400).json(respone);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: false, message: 'FAILED' });
  }
};

const userLogin = async (req: Request, res: Response) => {
  const userData: IUserLogin = req.body;
  try {
    const respone = await AuthService.loginByEmail(userData);
    if (respone.status) {
      res.status(200).json(respone);
    } else {
      res.status(400).json(respone);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: false, message: 'FAILED' });
  }
};

const getUserByAccessToken = async (req: Request, res: Response) => {
  const {access_token} = req.body;

  console.log(access_token)
  try {
    const respone = await AuthService.getUserByAccessToken(access_token);
    if (respone.status) {
      res.status(200).json(respone);
    } else {
      res.status(400).json(respone);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: false, message: 'FAILED' });
  }
};

router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/get-user', getUserByAccessToken);

export default router;
