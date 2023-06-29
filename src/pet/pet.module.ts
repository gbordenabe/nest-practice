import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PetSchema } from './entities/pet.entity';
import { PET } from 'src/common/models';

@Module({
  imports: [MongooseModule.forFeature([{ name: PET.name, schema: PetSchema }])],
  controllers: [PetController],
  providers: [PetService]
})
export class PetModule {}
