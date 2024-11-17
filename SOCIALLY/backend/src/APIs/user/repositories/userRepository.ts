// repositories/userRepository.ts

import { UserModel, IUser } from '../models/userModel'

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    return await UserModel.findOne({ email })
}

export const findUserById = async (userId: string): Promise<IUser | null> => {
    return await UserModel.findById(userId)
}

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    const user = new UserModel(userData)
    return await user.save()
}

export const findUserByName = async (name: string) => {
    return UserModel.find({ name: { $regex: name, $options: 'i' } }) // Case-insensitive search
}

export const updateUserProfile = async (userId: string, updateData: Partial<IUser>): Promise<IUser | null> => {
    return await UserModel.findByIdAndUpdate(userId, updateData, { new: true })
}
export const deleteUserById = async (userId: string): Promise<IUser | null> => {
    return await UserModel.findByIdAndDelete(userId)
}

export const saveResetToken = async (userId: string, token: string, expiration: number) => {
    // Update the user with the reset token and expiration
    await UserModel.findByIdAndUpdate(userId, {
        resetPasswordToken: token,
        resetPasswordExpires: expiration
    })
}
