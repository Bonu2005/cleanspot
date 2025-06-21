import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private accsecret = process.env.ACCESS_KEY;
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
     console.log(request.headers);
     
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      const data = await this.jwtService.verifyAsync(token, {
        secret: this.accsecret,
      });

      request['user'] = data; // ⬅️ обязательно сохраняй user
      return true;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
