"use server"

import { revalidatePath } from "next/cache"

import Profile from "../database/models/profile.model"
import { connectToDatabase } from "../database/mongoose"
import { handleError } from "../utils"

// ====== USER PARAMS

export declare type CreateProfileParams = {
  userId: string
  age: string
  gender: string
  weight: string
  height: string
  activityLevel: string
  diet?: string
  protein?: string
  allergies?: string
  dislikes?: string
  cuisine?: string
}

export declare type UpdateProfileParams = {
  age?: string
  gender?: string
  weight?: string
  height?: string
  activityLevel?: string
  diet?: string
  protein?: string
  allergies?: string
  dislikes?: string
  cuisine?: string
}

// CREATE
export async function createProfile(profile: CreateProfileParams) {
  try {
    await connectToDatabase()
    await setTimeout(() => {
      console.log("Waited for 5 seconds")
    }, 5000) // 2000 milliseconds = 2 seconds
    const newProfile = await Profile.create(profile)

    return JSON.parse(JSON.stringify(newProfile))
  } catch (error) {
    handleError(error)
  }
}

// READ
export async function getProfileById(userId: string) {
  try {
    await connectToDatabase()

    const profile = await Profile.findOne({ userId: userId })

    if (!profile) throw new Error("Profile not found")

    return JSON.parse(JSON.stringify(profile))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export async function updateProfile(
  userId: string,
  profile: UpdateProfileParams
) {
  try {
    await connectToDatabase()

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: userId },
      { ...profile },
      {
        new: true,
      }
    )

    if (!updatedProfile) throw new Error("Profile update failed")

    return JSON.parse(JSON.stringify(updatedProfile))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deleteProfile(userId: string) {
  try {
    await connectToDatabase()

    // Find profile to delete
    const profileToDelete = await Profile.findOne({ userId: userId })

    if (!profileToDelete) {
      throw new Error("Profile not found")
    }

    // Delete profile
    const deletedProfile = await Profile.findByIdAndDelete(profileToDelete._id)
    revalidatePath("/")

    return deletedProfile ? JSON.parse(JSON.stringify(deletedProfile)) : null
  } catch (error) {
    handleError(error)
  }
}
