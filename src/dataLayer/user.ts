import { Document } from 'mongoose';
export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  login_attempts: number;
  lock_until: number;
  email: string;
  permission: string;
  profile_pic: string;
  first_name: string;
  last_name: string;
  activation_codes: [
    {
      code: string;
    }
  ];
  user_type: string;
  status: string;
  forget_password_string: string;
  last_login: string;
  login_count: any;
  joining_date: string;
}
