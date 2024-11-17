// types/userTypes.ts

export interface IUser {
  _id: string; // Unique identifier for the user
  name: string; // Name of the user
  email: string; // Email address of the user
  password: string; // Password (may be excluded in some operations)
  bio?: string; // Optional bio
  avatar?: string; // Optional avatar URL
  resetPasswordToken?: string; // Optional reset password token
  resetPasswordExpires?: Date; // Optional expiration date for the reset token
}
