import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { EncryptionService } from 'src/common/encryption.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER.name) private userModel: Model<User>,
    private readonly encryptionService: EncryptionService
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.findOneByDni(createUserDto.dni)
      if(existingUser) throw new BadRequestException(`User with dni ${createUserDto.dni} alredy exists`)
      const hashedPassword = await this.encryptionService.hashPassword(createUserDto.password)
      const createdUser = new this.userModel({...createUserDto, password: hashedPassword});
      await createdUser.save()
      return await this.findOneByDni(createUserDto.dni)
    } catch (error) {
      throw new HttpException(error.message, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOneByUsername(username: string) {
    return await this.userModel.findOne({username});
  }

  async findOneByDni(dni: number) {
    return await this.userModel.findOne({dni});
  }

  async findOneByDniWithPassword(dni: number) {
    return await this.userModel.findOne({dni}).select('+password');
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
