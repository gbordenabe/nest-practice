import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Pet } from 'src/pet/entities/pet.entity';
import * as mongoose from 'mongoose';
import { PET } from 'src/common/models';

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true, unique: true })
  dni: number;

  @Prop({ required : true })
  username: string;

  @Prop({ required : true, select: false })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: PET.name }], default: [] })
  pets: Pet[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.__v;
  return userObject;
};