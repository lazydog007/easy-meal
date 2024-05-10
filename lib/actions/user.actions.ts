"use server"

import { revalidatePath } from "next/cache"

import User from "../database/models/user.model"
import { connectToDatabase } from "../database/mongoose"
import { handleError } from "../utils"

// ====== USER PARAMS
declare type CreateUserParams = {
  userId: string
  email: string
  // username: string
  firstName: string
  lastName: string
  photo: string
  // limits: IModelLimit[]
}

declare type UpdateUserParams = {
  firstName: string
  lastName: string
  // username: string
  photo: string
}

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase()

    const newUser = await User.create(user)

    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    handleError(error)
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    await connectToDatabase()

    const user = await User.findOne({ userId: userId })

    if (!user) throw new Error("User not found")

    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export async function updateUser(userId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase()

    const updatedUser = await User.findOneAndUpdate({ userId }, user, {
      new: true,
    })

    if (!updatedUser) throw new Error("User update failed")

    return JSON.parse(JSON.stringify(updatedUser))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deleteUser(userId: string) {
  try {
    await connectToDatabase()

    // Find user to delete
    const userToDelete = await User.findOne({ userId })

    if (!userToDelete) {
      throw new Error("User not found")
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id)
    revalidatePath("/")

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
  } catch (error) {
    handleError(error)
  }
}

// USE CREDITS
// connects to MongoDB
// export async function updateSubscriptionLimits(userId: string, model: string) {
//   try {
//     await connectToDatabase()

//     const subscription = await User.findOne({
//       userId: userId,
//     })
//     if (!subscription) {
//       throw new Error("Subscription not found")
//     }

//     const updatedLimits = subscription.limits.map((limit: IModelLimit) => {
//       if (limit.model === model) {
//         return { model: model, requests: limit.requests - 1 }
//       }
//       return limit
//     })

//     const updatedSubscription = await User.findOneAndUpdate(
//       { userId },
//       { $set: { limits: updatedLimits } },
//       { new: true }
//     )

//     return JSON.parse(JSON.stringify(updatedSubscription))
//   } catch (error) {
//     handleError(error)
//   }
// }
