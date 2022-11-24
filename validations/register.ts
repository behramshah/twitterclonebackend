import { body } from 'express-validator';

export const registerValidations = [
  body('email', 'Enter E-Mail')
    .isEmail()
    .withMessage('Incorrect E-Mail')
    .isLength({
      min: 5,
      max: 40,
    })
    .withMessage('E-mail length should be between 5 and 40 symbols.'),
  body('fullname', 'Enter fullname')
    .isString()
    .isLength({
      min: 2,
      max: 40,
    })
    .withMessage('Fullname length should be between 2 and 40.'),
  body('username', 'Enter username')
    .isString()
    .isLength({
      min: 2,
      max: 40,
    })
    .withMessage('Username length should be between 2 and 40.'),
  body('password', 'Enter password')
    .isString()
    .isLength({
      min: 6,
    })
    .withMessage('Password minimum length should be between 6')
    .custom((value, { req }) => {
      if (value !== req.body.password2) {
        throw new Error('doesnt match');
      } else {
        return value;
      }
    }),
];
