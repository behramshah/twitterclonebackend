import dotenv from 'dotenv';
dotenv.config();

import './core/db';

import express from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';

import { registerValidations } from './validations/register';
import { passport } from './core/passport';
import { createTweetValidations } from './validations/createTweet';

import { TweetsCtrl } from './controllers/TweetsController';
import { UserCtrl } from './controllers/UserController';
import { UploadFileCtrl } from './controllers/UploadFileController';

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.get('/users', UserCtrl.index);
app.get('/users/me', passport.authenticate('jwt', { session: false }), UserCtrl.getUserInfo);
app.get('/users/:id', UserCtrl.show);

app.get('/tweets', TweetsCtrl.index);
app.get('/tweets/:id', TweetsCtrl.show);
app.delete('/tweets/:id', passport.authenticate('jwt'), TweetsCtrl.delete);
app.patch('/tweets/:id', passport.authenticate('jwt'), createTweetValidations, TweetsCtrl.update);
app.post('/tweets', passport.authenticate('jwt'), createTweetValidations, TweetsCtrl.create);

app.get('/auth/verify', registerValidations, UserCtrl.verify);
app.post('/auth/register', registerValidations, UserCtrl.create);
app.post('/auth/login', passport.authenticate('local'), UserCtrl.afterLogin);

app.post('/upload', upload.single('avatar'), UploadFileCtrl.upload);

app.listen(process.env.PORT, (): void => {
  console.log(`SERVER salam deyir! on port ${process.env.PORT}`);
});