import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import * as mongoose from 'mongoose';
import { USER } from 'src/common/models';

export type PetDocument = Pet & Document;

@Schema()
export class Pet {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: USER.name })
  owner: User;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
