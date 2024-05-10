import { createProfile } from "@/lib/actions/profile.action"
import { CreateProfileParams } from "@/lib/database/models/profile.model"
import { auth } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"

// /api/createProfile
export async function POST(req: NextRequest, res: Response) {
  const { userId } = await auth()

  const { userProfile } = await req.json()

  // 1. checks if user is authenticated
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  try {
    const profile: CreateProfileParams = {
      userId: userId,
      age: userProfile.age,
      gender: userProfile.gender,
      height: userProfile.height,
      weight: userProfile.weight,
      activityLevel: userProfile.activityLevel,
      diet: userProfile.diet!,
      allergies: userProfile.allergies!,
      dislikes: userProfile.dislikes!,
      cuisine: userProfile.cuisine!,
    }
    const _userProfile = await createProfile(profile)
    return NextResponse.json(_userProfile)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    )
  }
}
