import { body } from 'express-validator';

export const createTweetValidations = [
  body('text', 'type your tweet')
    .isString()
    .isLength({
      max: 280,
    })
    .withMessage('Length of tweet must be less than 280 characters'),
];
