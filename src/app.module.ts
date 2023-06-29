import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PetModule } from './pet/pet.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27020/nest-practice-db'),
    UserModule,
    PetModule,
    AuthModule,
    CommonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
