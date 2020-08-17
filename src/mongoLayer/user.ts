import crypto from 'crypto';
import validator from 'validator';
import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';
import { IUser } from '../dataLayer/user';
const SALT_WORK_FACTOR = 10;

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 60 * 1000;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  login_attempts: {
    type: Number,
    required: true,
    default: 0
  },
  lock_until: {
    type: Number
  },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  permission: {
    type: String,
    required: true
  },
  activationCodes: [
    {
      code: { type: String }
    }
  ],
  user_type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  forget_password_string: {
    type: String
  },
  last_login: {
    type: String
  },
  loginCount: {
    type: Number
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  profile_pic: {
    type: String
  },
  joining_date: {
    type: String
  }
});
UserSchema.virtual('isLocked').get(function (this: IUser) {
  // check for a future lockUntil timestamp

  return !!(this.lock_until && this.lock_until > Date.now());
});

UserSchema.pre<IUser>('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // set the hashed password back on our user document
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (
  candidatePassword: any,
  cb: any
) {
  compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.methods.incLoginAttempts = function (cb: any) {
  // if we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.update(
      {
        $set: { loginAttempts: 1 },
        $unset: { lockUntil: 1 }
      },
      cb
    );
  }
  // otherwise we're incrementing
  const updates = { $inc: { loginAttempts: 1 } };
  // lock the account if we've reached max attempts and it's not locked already
  if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
    //  updates.$set = { lockUntil: Date.now() + LOCK_TIME };
  }
  return this.update(updates, cb);
};

// expose enum on the model, and provide an internal convenience reference
const reasons = (UserSchema.statics.failedLogin = {
  NOT_FOUND: 0,
  PASSWORD_INCORRECT: 1,
  MAX_ATTEMPTS: 2
});

UserSchema.statics.getAuthenticated = function (
  username: string,
  password: string,
  cb: any
) {
  this.findOne({ username: username }, function (err: any, user: any) {
    if (err) return cb(err);

    // make sure the user exists
    if (!user) {
      return cb(null, null, reasons.NOT_FOUND);
    }

    // check if the account is currently locked
    if (user.isLocked) {
      // just increment login attempts if account is already locked
      return user.incLoginAttempts(function (err: any) {
        if (err) return cb(err);
        return cb(null, null, reasons.MAX_ATTEMPTS);
      });
    }

    // test for a matching password
    user.comparePassword(password, function (err: any, isMatch: boolean) {
      if (err) return cb(err);

      // check if the password was a match
      if (isMatch) {
        // if there's no lock or failed attempts, just return the user
        if (!user.loginAttempts && !user.lockUntil) return cb(null, user);
        // reset attempts and lock info
        const updates = {
          $set: { loginAttempts: 0 },
          $unset: { lockUntil: 1 }
        };
        return user.update(updates, function (err: any) {
          if (err) return cb(err);
          return cb(null, user);
        });
      }

      // password is incorrect, so increment login attempts before responding
      user.incLoginAttempts(function (err: any) {
        if (err) return cb(err);
        return cb(null, null, reasons.PASSWORD_INCORRECT);
      });
    });
  });
};

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  crypto.createHash('sha256').update(resetToken).digest('hex');
};

export const userSchema = model<IUser>('User', UserSchema);
