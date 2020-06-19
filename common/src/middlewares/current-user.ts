import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const payload = verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
  } catch (error) {
    console.error(error);
  }

  next();
};
