import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { EncryptionService } from 'src/common/encryption.service';
import { RandomHexService } from 'src/common/randomHex.service';
import { EmailService } from 'src/common/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER.name) private userModel: Model<User>,
    private readonly encryptionService: EncryptionService,
    private readonly randomHexService: RandomHexService,
    private readonly emailService: EmailService
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.findOneByEmail(createUserDto.email);
      if (existingUser)
        throw new BadRequestException(`User with email ${createUserDto.email} alredy exists`);
      const hashedPassword = await this.encryptionService.hashPassword(createUserDto.password);
      const createdUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });
      createdUser.emailToken = this.randomHexService.generateRandomHex();
      await createdUser.save();
      this.emailService.sendMail(createdUser.email, createdUser.emailToken);
      return await this.findOneByEmail(createUserDto.email);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOneByUsername(username: string) {
    try {
      return await this.userModel.findOne({ username });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.userModel.findOne({ email });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOneByUsernameWithPassword(username: string) {
    try {
      const user = await this.userModel.findOne({ username }).select('+password');
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async verifyUser(emailToken: string) {
    try {
      const user = await this.userModel.findOne({ emailToken }).select('+emailToken');
      if (!user) {
        throw new BadRequestException('emailToken not found');
      }
      user.isVerified = true;
      user.emailToken = null;
      await user.save();
      return user;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
