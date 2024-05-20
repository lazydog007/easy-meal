import { getProfileById } from "@/lib/actions/profile.action"
import { auth } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"

// /api/getProfileById
export async function GET(req: NextRequest, res: Response) {
  const { userId } = await auth()

  // 1. checks if user is authenticated
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  try {
    const _profile = await getProfileById(userId)
    return NextResponse.json(_profile)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    )
  }
}
