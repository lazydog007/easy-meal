"use server"
import { getUserSubscription } from "@/lib/actions/subscription.action"
import { auth } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"

// /api/getUserSubscription
export async function GET(req: NextRequest, res: Response) {
  const { userId } = await auth()

  // 1. checks if user is authenticated
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  try {
    const _subcription = await getUserSubscription(userId)
    return NextResponse.json(_subcription)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Error fetching user subscription" },
      { status: 500 }
    )
  }
}
