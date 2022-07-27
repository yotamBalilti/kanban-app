import { Model, Schema, model } from 'mongoose';
import User from '../types/user';

interface IUserModel extends Model<User> {
  // eslint-disable-next-line no-unused-vars
  findMemberByCredentials({ username, password }: User): Promise<User>;
}

const userSchema = new Schema<User, IUserModel>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
    maxlength: 20,
  },
});

const UserModel = model<User, IUserModel>('User', userSchema);

export default UserModel;
