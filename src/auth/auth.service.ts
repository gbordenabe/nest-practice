import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SingInDto } from './dto/sing-in.dto';
import { EncryptionService } from 'src/common/encryption.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly encryptionService: EncryptionService  
  ) {}

  async signIn(singInDto: SingInDto): Promise<any> {
    const user = await this.userService.findOneByDniWithPassword(singInDto.dni);
    const isCorrectPassword = await this.encryptionService.comparePasswords(singInDto.password, user.password)
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong password');
    }
    return "Logueado"
  }
}
