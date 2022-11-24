import { body } from 'express-validator';

export const createTweetValidations = [
  body('text', 'Type the tweet text')
    .isString()
    .isLength({
      max: 280,
    })
    .withMessage('Maximum length for a tweet is 280 symbols'),
];
