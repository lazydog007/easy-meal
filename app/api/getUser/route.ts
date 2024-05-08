import { getUserById } from "@/lib/actions/user.actions"
import { auth } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"

// /api/getUser
export async function GET(req: NextRequest, res: Response) {
  const { userId } = await auth()

  // 1. checks if user is authenticated
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  try {
    const _chats = await getUserById(userId)
    return NextResponse.json(_chats)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    )
  }
}
