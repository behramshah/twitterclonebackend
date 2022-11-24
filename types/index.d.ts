import { UserModelInterface } from '../models/UserModel';
export {};

declare global {
  namespace Express {
    interface Request {
      user: UserModelInterface;
    }
  }
}
