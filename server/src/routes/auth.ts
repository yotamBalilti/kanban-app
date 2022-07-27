import { Router } from 'express';
import { body } from 'express-validator';
import userController from '../controllers/user';
import validation from '../handlers/validation';
import tokenHandler from '../handlers/tokenHandler';
import { User } from '../models/user';

router.post(
  '/register',

  body('username').custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject('Username already exists');
      }
    });
  }),
  body('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters'),
  body('password')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be between 3 and 20 characters'),
  body('confirmPassword')
    .isLength({ min: 8, max: 20 })
    .withMessage('Confirmed Password must be between 3 and 20 characters'),
  validation.validate,
  userController.register
);

router.post(
  '/login',
  body('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters'),
  body('password')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be between 3 and 20 characters'),
  validation.validate,
  userController.login
);

// router.post(
//     '/logout',
//     tokenHandler.verifyToken,
//     userController.logout
// );

router.post('/verify-token', tokenHandler.verifyToken, (req, res) => {
  res.sendStatus(200).json({ user: req.user });
});

module.exports = router;
