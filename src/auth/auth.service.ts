import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { EncryptionService } from 'src/common/encryption.service';
import { RegisterDto } from './dto/register.dto';
import { EmailTokenDto } from './dto/emailToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly encryptionService: EncryptionService
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userService.findOneByUsernameWithPassword(loginDto.username);

    const isCorrectPassword = await this.encryptionService.comparePasswords(
      loginDto.password,
      user.password
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong password');
    }
    return 'Logueado';
  }

  async register(registerDto: RegisterDto): Promise<any> {
    const requests = [
      this.userService.findOneByEmail(registerDto.email),
      this.userService.findOneByUsername(registerDto.username),
    ];
    const [existingEmail, existingUsername] = await Promise.all(requests);

    if (existingEmail) {
      throw new BadRequestException('Email already exists');
    }
    if (existingUsername) {
      throw new BadRequestException('Username already exists');
    }

    return await this.userService.create(registerDto);
  }

  async verifyEmail(emailToken: string): Promise<any> {
    try {
      await this.userService.verifyUser(emailToken);
      return 'Email verified successfully';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
