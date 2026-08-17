import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>, // Internal default repo
  ) {}

  async createUser(AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = AuthCredentialsDto;

    const salt =await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.repository.create({ username, password: hashedPassword });
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