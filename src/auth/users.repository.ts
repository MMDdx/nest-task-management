import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>, // Internal default repo
  ) {}

  async createUser(AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = AuthCredentialsDto;

    const user = this.repository.create({ username, password });
    try {
      await this.repository.save(user)
    }
    catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('username already exists');
      } else{
        throw new InternalServerErrorException()
      }
    }
  }

}