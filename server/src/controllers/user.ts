import UserModel from '../models/user';
import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

// @desc        Register new user
// @route       POST /api/auth/register
// @access      public
const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const userPassword = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET_KEY as string
    ).toString();
    const user = await UserModel.create({ username, userPassword });
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: '24h',
      }
    );
    res.status(201).json({ message: 'User created successfully', user, token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// @desc        User Login
// @route       POST /api/auth/login
// @access      public
const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username }).select(
      'password username'
    );
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            param: 'username',
            msg: 'User not found',
          },
        ],
      });
    }

    const decryptedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_KEY as string
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPass !== password) {
      return res.status(401).json({
        errors: [
          {
            param: 'password', // password or username
            msg: 'Password is incorrect',
          },
        ],
      });
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: '24h',
      }
    );
    res
      .status(201)
      .json({ message: 'User logged in successfully', user, token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { register, login };
