import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { UsersRepository } from './users.repository';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersRepository: UsersRepository) {
    super({
      secretOrKey: 'topsecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const {username} = payload;
    const user = await this.usersRepository.findOne(username);

    if (!user) {
      throw new UnauthorizedException()
    }
    return user;
  }
}