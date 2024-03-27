import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { Request, Response } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization']; // Access authorization header like this
    if (!authorization)
      throw new HttpException('No authorization', HttpStatus.FORBIDDEN);
    if (authorization === 'qwertyuiop') next();
    else throw new HttpException('Invalid authorization', HttpStatus.FORBIDDEN);
  }
}
